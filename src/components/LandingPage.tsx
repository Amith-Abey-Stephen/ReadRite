import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Heart, Sparkles, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStartQuiz: () => void;
  darkMode: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartQuiz, darkMode }) => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your personality and preferences to find your perfect genre match."
    },
    {
      icon: Heart,
      title: "Personalized Recommendations",
      description: "Get three handpicked book suggestions tailored specifically to your unique reading taste."
    },
    {
      icon: Sparkles,
      title: "Discover New Worlds",
      description: "Explore genres you might never have considered but are perfect for your current mood."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <BookOpen className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Powered by INOVUS LABS IEDC
          </span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
          ReadRite
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Discover your perfect book genre through AI-powered personality analysis. 
          Answer a few questions and unlock personalized reading recommendations.
        </p>
        
        <motion.button
          onClick={onStartQuiz}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Start Your Reading Journey
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="grid md:grid-cols-3 gap-8 mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-2xl border ${
              darkMode 
                ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                : 'bg-white/80 border-gray-200 hover:bg-white'
            } backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit mb-4">
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* How It Works Section */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Take the Quiz", desc: "Answer 8-10 thoughtful questions about your preferences and personality" },
            { step: "2", title: "AI Analysis", desc: "Our AI processes your responses to understand your reading profile" },
            { step: "3", title: "Get Recommendations", desc: "Receive your genre match and three personalized book suggestions" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-center max-w-xs`}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;