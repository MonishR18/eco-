import React from 'react';
import { Link } from 'react-router-dom';
import { getEcoPoints } from '../utils/storage';
import { getCurrentBadge } from '../data/badges';

const Home = () => {
  const ecoPoints = getEcoPoints();
  const currentBadge = getCurrentBadge(ecoPoints);

  const features = [
    {
      icon: '📸',
      title: 'Smart Waste Recognition',
      description: 'AI-powered image analysis to instantly classify waste types with high accuracy.'
    },
    {
      icon: '🌟',
      title: 'Eco Points System',
      description: 'Earn points for every correct classification and unlock environmental badges.'
    },
    {
      icon: '🗺️',
      title: 'Smart Bin Locations',
      description: 'Find nearby recycling centers and smart bins for proper waste disposal.'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor your environmental impact with detailed statistics and insights.'
    },
    {
      icon: '🌍',
      title: 'Educational Content',
      description: 'Learn about sustainability and proper waste management practices.'
    },
    {
      icon: '📱',
      title: 'PWA Ready',
      description: 'Install as an app and use offline for seamless waste sorting anywhere.'
    }
  ];

  const stats = [
    { number: '6', label: 'Waste Categories' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '24/7', label: 'Available' },
    { number: '0', label: 'Cost' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-8xl mb-6">🌱</div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-eco-green-600">EcoVision</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The smart waste sorting app that uses AI to help you make better environmental choices. 
            Scan, learn, and earn points while saving the planet!
          </p>
          
          {/* User Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-eco-green-600">{ecoPoints}</div>
                <div className="text-sm text-gray-600">Eco Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">{currentBadge.name}</div>
                <div className="text-sm text-gray-600">{currentBadge.description}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sort"
              className="btn-primary text-lg px-8 py-4"
            >
              🚀 Start Sorting Waste
            </Link>
            <Link
              to="/dashboard"
              className="btn-secondary text-lg px-8 py-4"
            >
              📊 View Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Why Choose EcoVision?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-eco-green-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:border-eco-green-300 transition-colors duration-200">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-eco-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📸</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Capture</h3>
            <p className="text-gray-600">
              Take a photo or upload an image of the waste item you want to classify.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-eco-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Analyze</h3>
            <p className="text-gray-600">
              Our AI instantly analyzes the image and identifies the waste type with high accuracy.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-eco-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">♻️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Dispose</h3>
            <p className="text-gray-600">
              Get detailed disposal instructions and earn eco points for proper waste management.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-eco-green-600 rounded-xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of users who are already making the world a cleaner place, one waste item at a time.
        </p>
        <Link
          to="/sort"
          className="bg-white text-eco-green-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 inline-block"
        >
          Start Your Eco Journey Today
        </Link>
      </div>
    </div>
  );
};

export default Home; 