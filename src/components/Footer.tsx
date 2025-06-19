import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Github, Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`border-t ${
      darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white/80'
    } backdrop-blur-sm mt-16`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ReadRite
                </h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  by INOVUS LABS IEDC
                </p>
              </div>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
              Discover your perfect book genre through AI-powered personality analysis. 
              Connecting readers with their ideal stories since 2024.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'About INOVUS LABS', href: '#' },
                { name: 'How It Works', href: '#' },
                { name: 'Privacy Policy', href: '#' },
                { name: 'Terms of Service', href: '#' },
                { name: 'Contact Us', href: '#' }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`text-sm hover:text-blue-600 transition-colors duration-300 ${
                      darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="font-semibold mb-4">Connect With INOVUS</h4>
            <div className="flex space-x-4 mb-4">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Innovation & Entrepreneurship Development Cell
            </p>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} mt-8 pt-8 flex flex-col md:flex-row items-center justify-between`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4 md:mb-0`}>
            © 2024 INOVUS LABS IEDC. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-1 text-sm">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>for book lovers</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;