import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, BarChart3, MapPin, Trophy, BookOpen, Users, Shield, Wifi } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Home = () => {
  const { credits, level, streak } = useUser();

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Smart Waste Sorting",
      description: "Use your camera to identify and sort waste items correctly",
      color: "bg-eco-green-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Track Your Progress",
      description: "Monitor your waste sorting habits and environmental impact",
      color: "bg-eco-blue-500"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Find Recycling Centers",
      description: "Locate nearby recycling facilities and waste collection points",
      color: "bg-purple-500"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Earn Rewards",
      description: "Gain credits and unlock badges for your eco-friendly actions",
      color: "bg-yellow-500"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Learn & Educate",
      description: "Access tips and educational content about waste management",
      color: "bg-green-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Tasks",
      description: "Participate in social challenges and environmental initiatives",
      color: "bg-pink-500"
    }
  ];

  const sectors = [
    {
      name: "Household",
      icon: "🏠",
      description: "Waste management for homes and families",
      color: "from-eco-green-400 to-eco-green-600"
    },
    {
      name: "Industrial",
      icon: "🏭",
      description: "Waste management for businesses and industries",
      color: "from-eco-blue-400 to-eco-blue-600"
    },
    {
      name: "Campus",
      icon: "🎓",
      description: "Waste management for schools and universities",
      color: "from-purple-400 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-eco-green-400 via-eco-green-500 to-eco-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-eco-green-100">EcoVision</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-eco-green-100">
              Your smart companion for sustainable waste management and environmental impact tracking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sort"
                className="bg-white text-eco-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-eco-green-50 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Start Sorting Waste
              </Link>
              <Link
                to="/learn"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-eco-green-600 transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-eco-green-400 to-eco-green-600 text-white p-6 rounded-xl text-center">
              <div className="text-3xl font-bold mb-2">{credits}</div>
              <div className="text-eco-green-100">Eco Credits</div>
            </div>
            <div className="bg-gradient-to-r from-eco-blue-400 to-eco-blue-600 text-white p-6 rounded-xl text-center">
              <div className="text-3xl font-bold mb-2">{level}</div>
              <div className="text-eco-blue-100">Level</div>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-xl text-center">
              <div className="text-3xl font-bold mb-2">{streak}</div>
              <div className="text-purple-100">Day Streak</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose EcoVision?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive waste management solution with smart features and community engagement
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${feature.color} text-white p-3 rounded-lg w-fit mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">For Every Sector</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored waste management solutions for different environments and needs
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                className={`bg-gradient-to-br ${sector.color} text-white p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300`}
              >
                <div className="text-6xl mb-4">{sector.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{sector.name}</h3>
                <p className="text-lg opacity-90">{sector.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-eco-green-500 to-eco-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 text-eco-green-100">
              Join thousands of users already making a positive environmental impact
            </p>
            <Link
              to="/sort"
              className="bg-white text-eco-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-eco-green-50 transition-colors duration-300 inline-flex items-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Start Your Eco Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
