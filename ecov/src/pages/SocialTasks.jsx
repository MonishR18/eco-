import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Calendar, Award } from 'lucide-react';

const SocialTasks = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Users className="w-16 h-16 text-eco-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Community Tasks</h1>
          <p className="text-xl text-gray-600 mb-8">Coming Soon - Join community challenges and environmental initiatives</p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <Target className="w-12 h-12 text-eco-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Community Features</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-eco-green-500 rounded-full"></div>
                <span>Participate in waste reduction challenges</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-eco-green-500 rounded-full"></div>
                <span>Join local environmental initiatives</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-eco-green-500 rounded-full"></div>
                <span>Earn community rewards and recognition</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-eco-green-500 rounded-full"></div>
                <span>Connect with like-minded environmentalists</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialTasks; 