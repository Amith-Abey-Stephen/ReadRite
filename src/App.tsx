import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Footer from './components/Footer';
import { QuizAnswer, RecommendationResult } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'quiz' | 'results'>('landing');
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [results, setResults] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
    setAnswers([]);
    setResults(null);
  };

  const handleQuizComplete = async (quizAnswers: QuizAnswer[]) => {
    setAnswers(quizAnswers);
    setLoading(true);
    
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: quizAnswers }),
      });
      
      const data = await response.json();
      setResults(data);
      setCurrentStep('results');
    } catch (error) {
      console.error('Error getting recommendations:', error);
      // Fallback with sample data for demo
      setResults({
        genre: "Mystery Enthusiast",
        description: "You have a keen eye for detail and love unraveling complex puzzles. Mystery novels with intricate plots and unexpected twists are perfect for your analytical mind.",
        books: [
          {
            title: "The Silent Patient",
            author: "Alex Michaelides",
            reason: "A psychological thriller that will keep you guessing until the very last page, perfect for your love of complex characters and plot twists."
          },
          {
            title: "Gone Girl",
            author: "Gillian Flynn",
            reason: "This psychological thriller offers the dark, complex narrative you crave with unreliable narrators and shocking revelations."
          },
          {
            title: "The Thursday Murder Club",
            author: "Richard Osman",
            reason: "A cozy mystery that combines humor with clever plotting, ideal for your appreciation of well-crafted puzzles and character development."
          }
        ]
      });
      setCurrentStep('results');
    } finally {
      setLoading(false);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentStep('landing');
    setAnswers([]);
    setResults(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
    }`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage onStartQuiz={handleStartQuiz} darkMode={darkMode} />
            </motion.div>
          )}
          
          {currentStep === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Quiz onComplete={handleQuizComplete} darkMode={darkMode} />
            </motion.div>
          )}
          
          {currentStep === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <Results 
                results={results} 
                loading={loading} 
                onRetakeQuiz={handleRetakeQuiz}
                darkMode={darkMode}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;