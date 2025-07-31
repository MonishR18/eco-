import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Info, Play, Users, Building, GraduationCap } from 'lucide-react';
import tipsData from '../data/tips.json';

const LearnHub = () => {
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTips = tipsData.tips.filter(tip => {
    const matchesSector = selectedSector === 'all' || tip.category === selectedSector;
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    return matchesSector && matchesCategory;
  });

  const sectors = [
    {
      key: 'household',
      name: 'Household',
      icon: <Users className="w-6 h-6" />,
      description: 'Waste management for homes and families',
      color: 'from-eco-green-400 to-eco-green-600'
    },
    {
      key: 'industrial',
      name: 'Industrial',
      icon: <Building className="w-6 h-6" />,
      description: 'Waste management for businesses and industries',
      color: 'from-eco-blue-400 to-eco-blue-600'
    },
    {
      key: 'campus',
      name: 'Campus',
      icon: <GraduationCap className="w-6 h-6" />,
      description: 'Waste management for schools and universities',
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const categories = [
    { key: 'general', name: 'General Tips', icon: '♻️' },
    { key: 'plastic', name: 'Plastic Waste', icon: '🔄' },
    { key: 'organic', name: 'Organic Waste', icon: '🌱' },
    { key: 'e-waste', name: 'E-Waste', icon: '📱' },
    { key: 'household', name: 'Household', icon: '🏠' },
    { key: 'industrial', name: 'Industrial', icon: '🏭' },
    { key: 'campus', name: 'Campus', icon: '🎓' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Learning Hub</h1>
          <p className="text-gray-600">Expand your knowledge about waste management and sustainability</p>
        </motion.div>

        {/* Sectors Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Sector</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedSector(sector.key)}
                className={`bg-gradient-to-r ${sector.color} text-white rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform duration-300 ${
                  selectedSector === sector.key ? 'ring-4 ring-white ring-opacity-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  {sector.icon}
                  <h3 className="text-xl font-bold">{sector.name}</h3>
                </div>
                <p className="text-white text-opacity-90">{sector.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-eco-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.key
                    ? 'bg-eco-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tips Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-3 mb-4">
                <div className="text-3xl">{tip.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm">{tip.content}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 capitalize">{tip.category}</span>
                <div className="flex items-center space-x-2 text-eco-green-600">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-sm font-medium">Tip</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Educational Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gradient-to-r from-eco-green-400 to-eco-blue-600 text-white rounded-xl p-8"
        >
          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Ready to Learn More?</h2>
            <p className="text-xl mb-6 text-white text-opacity-90">
              Explore our comprehensive resources and become a waste management expert
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-eco-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Videos</span>
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-eco-green-600 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Info className="w-5 h-5" />
                <span>Read Articles</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LearnHub; 