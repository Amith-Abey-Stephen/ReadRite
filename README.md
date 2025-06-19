# ReadRite - AI Book Genre Recommender

## 🚀 Project Overview

ReadRite is an AI-powered book genre recommendation system built for INOVUS LABS IEDC. It uses intelligent questioning and OpenRouter's GPT-3.5 to analyze user personalities and recommend perfect book genres with personalized book suggestions.

## ✨ Features

- **Interactive Quiz**: 10 thoughtfully crafted questions to understand reading preferences
- **AI-Powered Analysis**: Uses OpenRouter GPT-3.5 for intelligent genre matching
- **Personalized Recommendations**: Get 3 handpicked book suggestions
- **Beautiful UI**: Modern, responsive design with dark/light mode
- **Social Sharing**: Share your reading personality results
- **INOVUS Branding**: Professional branding integration

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Express.js** (Node.js)
- **OpenRouter API** integration
- **CORS** enabled
- **Environment-based configuration**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- OpenRouter API key
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   ```
   
   Add your OpenRouter API key to `backend/.env`:
   ```env
   OPENROUTER_API_KEY=your-openrouter-api-key-here
   PORT=3001
   NODE_ENV=development
   ```

3. **Start the development servers**
   
   Terminal 1 (Frontend):
   ```bash
   npm run dev
   ```
   
   Terminal 2 (Backend):
   ```bash
   npm run server
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy!

### Backend (Railway/Render)
1. Create new service on Railway or Render
2. Connect GitHub repository
3. Set environment variables:
   - `OPENROUTER_API_KEY`
   - `NODE_ENV=production`
   - `FRONTEND_URL=your-vercel-domain`
4. Set start command: `node backend/server.js`
5. Deploy!

### Environment Variables

**Backend (.env)**:
```env
OPENROUTER_API_KEY=your-openrouter-api-key
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

## 📁 Project Structure

```
readrite/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── LandingPage.tsx
│   │   ├── Quiz.tsx
│   │   ├── Results.tsx
│   │   └── Footer.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── backend/
│   ├── server.js
│   └── .env.example
└── public/
```

## 🎯 Key Features Explained

### Quiz System
- 10 carefully designed questions
- Categories: mood, personality, preference, lifestyle
- Progressive UI with smooth animations
- Score-based analysis system

### AI Recommendation Engine
- OpenRouter GPT-3.5 integration
- Personality-based genre matching
- Personalized book suggestions with explanations
- Fallback system for API limits

### User Experience
- Responsive design (mobile-first)
- Dark/light mode toggle
- Smooth animations and transitions
- Social sharing capabilities
- Progress tracking

## 🔧 API Endpoints

### `POST /api/recommend`
Generates book recommendations based on quiz answers.

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": 1,
      "question": "Question text",
      "answer": "Selected answer",
      "value": 8
    }
  ]
}
```

**Response:**
```json
{
  "genre": "Mystery Enthusiast",
  "description": "You have a keen eye for detail...",
  "books": [
    {
      "title": "The Silent Patient",
      "author": "Alex Michaelides", 
      "reason": "Perfect for your analytical mind..."
    }
  ]
}
```

## 🎨 Design System

### Colors
- Primary: Blue gradient (#3B82F6 to #8B5CF6)
- Secondary: Purple (#7C3AED)
- Accent: Orange (#F97316)
- Success: Green (#10B981)
- Error: Red (#EF4444)

### Typography
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Spacing
- Based on 8px grid system
- Consistent padding and margins

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Performance Features

- Code splitting with Vite
- Optimized images and assets
- Lazy loading for components
- Efficient state management
- API response caching

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **INOVUS LABS IEDC** for project sponsorship
- **OpenRouter** for GPT-3.5 API
- **Vercel** for frontend hosting
- **Railway/Render** for backend hosting

## 📞 Support

For support, email: support@inovuslabs.com or join our Slack channel.

---

**Made with ❤️ by INOVUS LABS IEDC**