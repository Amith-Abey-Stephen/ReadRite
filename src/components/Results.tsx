import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Share2, RefreshCw, Download, Twitter, Facebook, Instagram } from 'lucide-react';
import { RecommendationResult } from '../types';

interface ResultsProps {
  results: RecommendationResult | null;
  loading: boolean;
  onRetakeQuiz: () => void;
  darkMode: boolean;
}

const Results: React.FC<ResultsProps> = ({ results, loading, onRetakeQuiz, darkMode }) => {
  const handleShare = (platform: string) => {
    if (!results) return;

    const text = `I'm a ${results.genre}! 📚 Discover your reading personality with ReadRite by INOVUS LABS`;
    const url = window.location.href;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
    }
  };

  const downloadResultCard = () => {
    // This would implement a canvas-based image generation for sharing
    // For now, we'll just copy the results to clipboard
    if (results) {
      const textToCopy = `I'm a ${results.genre}!\n\n${results.description}\n\nRecommended books:\n${results.books.map((book, index) => 
        `${index + 1}. ${book.title} by ${book.author}`
      ).join('\n')}\n\nDiscover your reading personality at ReadRite by INOVUS LABS`;
      
      navigator.clipboard.writeText(textToCopy);
      alert('Results copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-6"
        >
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </motion.div>
        <h2 className="text-2xl font-bold mb-4">Analyzing Your Reading Personality...</h2>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Our AI is processing your responses to find your perfect book matches
        </p>
      </div>
    );
  }

  if (!results) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
        >
          <BookOpen className="h-10 w-10 text-white" />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          You're a{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {results.genre}
          </span>
          !
        </h1>
        
        <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed`}>
          {results.description}
        </p>
      </motion.div>

      {/* Book Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Your Perfect Book Matches</h2>
        
        <div className="grid gap-6">
          {results.books.map((book, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className={`p-6 rounded-2xl border ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white/80 border-gray-200'
              } backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{book.title}</h3>
                  <p className={`text-lg font-medium mb-3 ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    by {book.author}
                  </p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {book.reason}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className={`p-8 rounded-2xl border ${
          darkMode 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        } backdrop-blur-sm mb-8`}
      >
        <h3 className="text-2xl font-bold text-center mb-6">Share Your Results</h3>
        
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
          >
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </button>
          
          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors duration-300"
          >
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </button>
          
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
          >
            <Share2 className="h-4 w-4 mr-2" />
            WhatsApp
          </button>
          
          <button
            onClick={downloadResultCard}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            <Download className="h-4 w-4 mr-2" />
            Copy Results
          </button>
        </div>
        
        <div className="text-center">
          <button
            onClick={onRetakeQuiz}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Take Quiz Again
          </button>
        </div>
      </motion.div>

      {/* INOVUS Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-center py-8"
      >
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Powered by{' '}
          <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            INOVUS LABS IEDC
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Results;