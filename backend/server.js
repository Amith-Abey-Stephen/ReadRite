import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import OpenAI from 'openai';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-domain.vercel.app'] 
    : ['http://localhost:5173', 'http://localhost:3000']
}));
app.use(express.json());

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, '../dist')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ReadRite API is running' });
});

// Main recommendation endpoint
app.post('/api/recommend', async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid answers format' });
    }

    // Check if OpenRouter API key is configured
    if (!process.env.OPENROUTER_API_KEY ) {
      console.log('OpenRouter API key not configured, using fallback responses');
      return generateFallbackResponse(answers, res);
    }

    // Prepare the prompt for OpenRouter with enhanced handling for custom responses
    const userAnswers = answers.map((answer, index) => {
      const customNote = answer.isCustom ? ' (Custom response)' : '';
      return `Q${index + 1}: ${answer.question}\nA: ${answer.answer}${customNote} (Score: ${answer.value})`;
    }).join('\n\n');

    const totalScore = answers.reduce((sum, answer) => sum + answer.value, 0);
    const averageScore = totalScore / answers.length;
    const customResponses = answers.filter(answer => answer.isCustom);
    const hasCustomResponses = customResponses.length > 0;

    // Create a more detailed analysis based on answers
    const analysisContext = analyzeAnswers(answers);

    const prompt = `You are a literary expert and book recommendation specialist. Based on a user's quiz responses, provide personalized book genre and recommendations for college students.\n\nUser's Quiz Responses:\n${userAnswers}\n\nAnalysis Summary:\n- Average Response Score: ${averageScore}/10\n- Dominant preferences: ${analysisContext.dominantTraits.join(', ')}\n- Reading style: ${analysisContext.readingStyle}\n- Personality indicators: ${analysisContext.personalityType}${hasCustomResponses ? `\nIMPORTANT: This user provided ${customResponses.length} custom response(s), showing unique preferences. Custom responses: ${customResponses.map(r => `\"${r.answer}\"`).join(', ')}` : ''}\n\nBased on these responses, please provide a JSON response with exactly this structure:\n{\n  "genre": "A creative, specific genre name that captures their reading personality based on their actual responses",\n  "description": "A 2-3 sentence explanation of why this genre matches their personality and preferences, written in second person. Reference specific answers they gave.",\n  "books": [\n    {\n      "title": "Book Title",\n      "author": "Author Name", \n      "reason": "A personalized explanation referencing their specific quiz responses"\n    },\n    {\n      "title": "Book Title",\n      "author": "Author Name",\n      "reason": "A personalized explanation referencing their specific quiz responses"\n    },\n    {\n      "title": "Book Title", \n      "author": "Author Name",\n      "reason": "A personalized explanation referencing their specific quiz responses"\n    }\n  ]\n}\n\nCRITICAL: Make sure each recommendation is DIFFERENT and based on their ACTUAL answers. Vary the genre names significantly based on their responses.`;

    // OpenRouter API call
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://your-vercel-domain.vercel.app', // Optional: set to your deployed domain
        'X-Title': 'ReadRite', // Optional: set to your app name
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides book recommendations based on personality analysis. Always respond with valid JSON only. Make sure each response is unique and tailored to the specific user\'s answers. Never give generic responses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1200,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        return res.status(429).json({ 
          error: 'API quota exceeded. Please try again later.',
          fallback: true
        });
      }
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    try {
      const recommendations = JSON.parse(content);
      res.json(recommendations);
    } catch (parseError) {
      console.error('Error parsing OpenRouter response:', parseError);
      return generateFallbackResponse(answers, res);
    }

  } catch (error) {
    console.error('Error generating recommendations:', error);
    return generateFallbackResponse(answers, res);
  }
});

// Function to analyze answers and create context
function analyzeAnswers(answers) {
  const scores = answers.map(a => a.value);
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  // Analyze answer patterns
  const highScoreAnswers = answers.filter(a => a.value >= 7);
  const customAnswers = answers.filter(a => a.isCustom);
  
  let dominantTraits = [];
  let readingStyle = '';
  let personalityType = '';
  
  // Determine traits based on high-scoring answers
  if (highScoreAnswers.some(a => a.answer.toLowerCase().includes('mystery') || a.answer.toLowerCase().includes('thriller') || a.answer.toLowerCase().includes('detective'))) {
    dominantTraits.push('Mystery/Thriller lover');
  }
  if (highScoreAnswers.some(a => a.answer.toLowerCase().includes('fantasy') || a.answer.toLowerCase().includes('magic') || a.answer.toLowerCase().includes('dragon'))) {
    dominantTraits.push('Fantasy enthusiast');
  }
  if (highScoreAnswers.some(a => a.answer.toLowerCase().includes('romantic') || a.answer.toLowerCase().includes('love') || a.answer.toLowerCase().includes('relationship'))) {
    dominantTraits.push('Romance seeker');
  }
  if (highScoreAnswers.some(a => a.answer.toLowerCase().includes('historical') || a.answer.toLowerCase().includes('biography') || a.answer.toLowerCase().includes('real'))) {
    dominantTraits.push('Non-fiction/Historical preference');
  }
  
  // Determine reading style
  if (avgScore >= 7) {
    readingStyle = 'Intense, immersive reader';
  } else if (avgScore >= 5.5) {
    readingStyle = 'Balanced, thoughtful reader';
  } else {
    readingStyle = 'Casual, comfort reader';
  }
  
  // Determine personality type
  if (customAnswers.length > 2) {
    personalityType = 'Highly individualistic';
  } else if (answers.some(a => a.answer.toLowerCase().includes('analyze') || a.answer.toLowerCase().includes('methodical'))) {
    personalityType = 'Analytical thinker';
  } else if (answers.some(a => a.answer.toLowerCase().includes('instinct') || a.answer.toLowerCase().includes('creative'))) {
    personalityType = 'Intuitive creative';
  } else {
    personalityType = 'Balanced personality';
  }
  
  return {
    dominantTraits: dominantTraits.length > 0 ? dominantTraits : ['Eclectic reader'],
    readingStyle,
    personalityType
  };
}

// Function to generate varied fallback responses based on actual answers
function generateFallbackResponse(answers, res) {
  const analysis = analyzeAnswers(answers);
  const hasCustomResponses = answers.some(answer => answer.isCustom);
  const avgScore = answers.reduce((sum, answer) => sum + answer.value, 0) / answers.length;
  
  // Generate different responses based on analysis
  let genre, description, books;
  
  if (analysis.dominantTraits.includes('Mystery/Thriller lover')) {
    genre = "Mystery Mastermind";
    description = "You have a sharp, analytical mind that thrives on puzzles and unexpected twists. Your love for methodical thinking and attention to detail makes you perfect for stories that challenge your deductive skills.";
    books = [
      {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        reason: "Your analytical nature will love unraveling this psychological thriller's complex layers and shocking revelations."
      },
      {
        title: "Gone Girl",
        author: "Gillian Flynn",
        reason: "Perfect for your appreciation of intricate plots and unreliable narrators that keep you guessing."
      },
      {
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        reason: "Combines your love of puzzles with character-driven storytelling that matches your thoughtful approach."
      }
    ];
  } else if (analysis.dominantTraits.includes('Fantasy enthusiast')) {
    genre = "Fantasy Voyager";
    description = "You're drawn to worlds beyond the ordinary, where imagination knows no bounds. Your creative spirit and love for escapism make you perfect for epic adventures and magical realms.";
    books = [
      {
        title: "The Name of the Wind",
        author: "Patrick Rothfuss",
        reason: "Your love for rich, imaginative worlds will be captivated by this beautifully crafted fantasy epic."
      },
      {
        title: "Circe",
        author: "Madeline Miller",
        reason: "Combines your appreciation for fantasy with deep character development and beautiful prose."
      },
      {
        title: "The Priory of the Orange Tree",
        author: "Samantha Shannon",
        reason: "An epic fantasy that matches your desire for immersive, magical storytelling with strong characters."
      }
    ];
  } else if (analysis.dominantTraits.includes('Romance seeker')) {
    genre = "Romantic Idealist";
    description = "You believe in the power of love and human connection. Your warm heart and appreciation for emotional depth draw you to stories that celebrate relationships and personal growth.";
    books = [
      {
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        reason: "Perfect for your love of complex relationships and emotionally rich storytelling with glamorous settings."
      },
      {
        title: "Beach Read",
        author: "Emily Henry",
        reason: "Combines romance with deeper themes that match your appreciation for both heart and substance."
      },
      {
        title: "The Invisible Life of Addie LaRue",
        author: "V.E. Schwab",
        reason: "A unique love story that spans centuries, perfect for your romantic yet thoughtful reading preferences."
      }
    ];
  } else if (hasCustomResponses) {
    genre = "Unique Literary Soul";
    description = "You march to the beat of your own drum when it comes to reading. Your personalized responses show you have distinct tastes that don't fit into conventional categories, making you a truly individual reader.";
    books = [
      {
        title: "The Midnight Library",
        author: "Matt Haig",
        reason: "A philosophical novel that explores life's infinite possibilities, perfect for your unique perspective on storytelling."
      },
      {
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        reason: "An unconventional narrative that matches your appreciation for stories that think outside the box."
      },
      {
        title: "The Seven Moons of Maali Almeida",
        author: "Shehan Karunatilaka",
        reason: "A genre-bending novel that combines humor, mystery, and social commentary - perfect for your eclectic tastes."
      }
    ];
  } else {
    genre = "Thoughtful Explorer";
    description = "You approach reading with curiosity and an open mind. Your balanced responses show you appreciate quality storytelling across genres and value both entertainment and meaning in your books.";
    books = [
      {
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        reason: "A beautifully written story that combines mystery, nature, and human emotion - perfect for your well-rounded reading taste."
      },
      {
        title: "Educated",
        author: "Tara Westover",
        reason: "A powerful memoir that offers both personal insight and broader social themes, matching your thoughtful approach."
      },
      {
        title: "The Atlas Six",
        author: "Olivie Blake",
        reason: "Blends fantasy elements with psychological depth, appealing to your appreciation for multi-layered narratives."
      }
    ];
  }
  
  res.json({
    genre,
    description,
    books
  });
}

// Fallback to index.html for SPA routes (after API routes)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`ReadRite API server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`OpenRouter API configured: ${process.env.OPENROUTER_API_KEY ? 'Yes' : 'No'}`);
});