import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Edit3 } from 'lucide-react';
import { Question, QuizAnswer } from '../types';

interface QuizProps {
  onComplete: (answers: QuizAnswer[]) => void;
  darkMode: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's your ideal way to spend a weekend evening?",
    category: "lifestyle",
    options: [
      { text: "Curled up with a gripping thriller, heart racing with every page", value: 8 },
      { text: "Lost in a fantasy world with dragons and magic", value: 6 },
      { text: "Reading a thought-provoking literary novel by the fireplace", value: 7 },
      { text: "Exploring historical events through a captivating biography", value: 5 },
      { text: "Other (please specify)", value: 6, isOther: true }
    ]
  },
  {
    id: 2,
    question: "When faced with a difficult decision, you typically:",
    category: "personality",
    options: [
      { text: "Analyze all possible outcomes methodically", value: 7 },
      { text: "Trust your gut instinct immediately", value: 6 },
      { text: "Seek advice from trusted friends and family", value: 5 },
      { text: "Research extensively before deciding", value: 8 },
      { text: "Other approach (describe it)", value: 6, isOther: true }
    ]
  },
  {
    id: 3,
    question: "Which setting appeals to you most?",
    category: "preference",
    options: [
      { text: "A mysterious old mansion with hidden secrets", value: 8 },
      { text: "A bustling modern city with endless possibilities", value: 6 },
      { text: "A peaceful countryside village with close-knit community", value: 5 },
      { text: "An exotic foreign country with rich culture", value: 7 },
      { text: "Somewhere else entirely (tell us where)", value: 6, isOther: true }
    ]
  },
  {
    id: 4,
    question: "Your friends would describe you as:",
    category: "personality",
    options: [
      { text: "The detective who notices every detail", value: 8 },
      { text: "The dreamer with wild imagination", value: 6 },
      { text: "The wise one who gives great advice", value: 7 },
      { text: "The adventurer always seeking new experiences", value: 5 },
      { text: "Something else (describe yourself)", value: 6, isOther: true }
    ]
  },
  {
    id: 5,
    question: "What kind of endings do you prefer in stories?",
    category: "preference",
    options: [
      { text: "Shocking twists that make you rethink everything", value: 8 },
      { text: "Happy endings where love conquers all", value: 5 },
      { text: "Bittersweet conclusions that feel realistic", value: 7 },
      { text: "Open endings that let imagination fill the gaps", value: 6 },
      { text: "A different type of ending (explain)", value: 6, isOther: true }
    ]
  },
  {
    id: 6,
    question: "When you're stressed, you find comfort in:",
    category: "mood",
    options: [
      { text: "Solving puzzles or brain teasers", value: 8 },
      { text: "Escaping into romantic stories", value: 5 },
      { text: "Reading about real people overcoming challenges", value: 7 },
      { text: "Immersing yourself in fantastical worlds", value: 6 },
      { text: "Other activities (share what helps you)", value: 6, isOther: true }
    ]
  },
  {
    id: 7,
    question: "Your ideal protagonist is:",
    category: "preference",
    options: [
      { text: "A flawed but brilliant detective solving complex cases", value: 8 },
      { text: "An ordinary person discovering extraordinary powers", value: 6 },
      { text: "Someone navigating complex relationships and emotions", value: 5 },
      { text: "A real person who made a significant impact on history", value: 7 },
      { text: "A different type of character (describe them)", value: 6, isOther: true }
    ]
  },
  {
    id: 8,
    question: "What draws you to a book cover?",
    category: "preference",
    options: [
      { text: "Dark, mysterious imagery that hints at secrets", value: 8 },
      { text: "Vibrant colors and magical elements", value: 6 },
      { text: "Elegant, minimalist design with meaningful symbols", value: 7 },
      { text: "Warm, inviting scenes that suggest human connection", value: 5 },
      { text: "Something else catches my eye (what is it?)", value: 6, isOther: true }
    ]
  },
  {
    id: 9,
    question: "How do you approach new challenges?",
    category: "personality",
    options: [
      { text: "Break them down systematically and look for patterns", value: 8 },
      { text: "Dive in headfirst with enthusiasm and creativity", value: 6 },
      { text: "Learn from others who've faced similar challenges", value: 7 },
      { text: "Take time to understand the emotional aspects involved", value: 5 },
      { text: "I have my own unique approach (tell us about it)", value: 6, isOther: true }
    ]
  },
  {
    id: 10,
    question: "What's your relationship with technology?",
    category: "lifestyle",
    options: [
      { text: "I love using it to solve problems and uncover information", value: 8 },
      { text: "I appreciate it but prefer timeless, traditional experiences", value: 7 },
      { text: "I use it to connect with others and share experiences", value: 5 },
      { text: "I'm fascinated by its potential and possibilities", value: 6 },
      { text: "My relationship with tech is complicated (explain)", value: 6, isOther: true }
    ]
  }
];

const Quiz: React.FC<QuizProps> = ({ onComplete, darkMode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [otherText, setOtherText] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    const option = questions[currentQuestion].options[optionIndex];
    setSelectedOption(optionIndex);
    
    if (option.isOther) {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      setOtherText('');
    }
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const question = questions[currentQuestion];
    const selectedOptionData = question.options[selectedOption];
    
    // If "Other" is selected but no text is provided, don't proceed
    if (selectedOptionData.isOther && !otherText.trim()) {
      return;
    }

    const answer: QuizAnswer = {
      questionId: question.id,
      question: question.question,
      answer: selectedOptionData.isOther ? otherText.trim() : selectedOptionData.text,
      value: selectedOptionData.value,
      isCustom: selectedOptionData.isOther || false
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setOtherText('');
      setShowOtherInput(false);
    } else {
      onComplete(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption(null);
      setOtherText('');
      setShowOtherInput(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const canProceed = selectedOption !== null && (!showOtherInput || otherText.trim().length > 0);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className={`mb-8 p-4 rounded-lg ${
        darkMode ? 'bg-gray-800/50' : 'bg-white/80'
      } backdrop-blur-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <motion.div
            className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className={`p-8 rounded-2xl border ${
            darkMode 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          } backdrop-blur-sm shadow-lg mb-8`}
        >
          <div className="mb-6">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
              darkMode 
                ? 'bg-blue-900/30 text-blue-300 border border-blue-700' 
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
            </div>
            <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                  selectedOption === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md'
                    : darkMode
                    ? 'border-gray-600 bg-gray-700/30 hover:bg-gray-700/50 hover:border-gray-500'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {option.isOther && <Edit3 className="h-4 w-4 text-blue-500" />}
                    <span className="text-lg">{option.text}</span>
                  </div>
                  {selectedOption === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-blue-500 text-white p-1 rounded-full"
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Other Input Field */}
          <AnimatePresence>
            {showOtherInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className={`p-4 rounded-xl border-2 border-blue-500 ${
                  darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
                }`}>
                  <label className="block text-sm font-medium mb-2">
                    Please share your thoughts:
                  </label>
                  <textarea
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    placeholder="Tell us more about your preference..."
                    className={`w-full p-3 rounded-lg border resize-none ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    rows={3}
                    maxLength={200}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {otherText.length}/200 characters
                    </span>
                    {otherText.trim().length > 0 && (
                      <span className="text-xs text-green-500 font-medium">
                        ✓ Ready to continue
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            currentQuestion === 0
              ? 'opacity-50 cursor-not-allowed'
              : darkMode
              ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
          }`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            !canProceed
              ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'Get My Recommendations' : 'Next'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Quiz;