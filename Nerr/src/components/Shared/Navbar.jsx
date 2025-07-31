import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Camera, BarChart3, MapPin, Trophy, BookOpen, Users, Home } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { credits, level } = useUser();
  const { user } = useAuth();

  const navigation = [
    { name: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Sort Waste', href: '/sort', icon: <Camera className="w-5 h-5" /> },
    { name: 'Tracker', href: '/tracker', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Dashboard', href: '/dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Rewards', href: '/rewards', icon: <Trophy className="w-5 h-5" /> },
    { name: 'Learn', href: '/learn', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Tasks', href: '/tasks', icon: <Users className="w-5 h-5" /> },
    { name: 'Locations', href: '/locations', icon: <MapPin className="w-5 h-5" /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-eco-green-400 to-eco-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🌱</span>
            </div>
            <span className="text-xl font-bold text-gray-800">EcoVision</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  isActive(item.href)
                    ? 'bg-eco-green-100 text-eco-green-700'
                    : 'text-gray-600 hover:text-eco-green-600 hover:bg-eco-green-50'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Info */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-eco-green-50 px-3 py-2 rounded-lg">
              <span className="text-eco-green-600 font-semibold">{credits}</span>
              <span className="text-eco-green-600 text-sm">credits</span>
            </div>
            <div className="flex items-center space-x-2 bg-eco-blue-50 px-3 py-2 rounded-lg">
              <span className="text-eco-blue-600 font-semibold">Lv.{level}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-eco-green-100 rounded-full flex items-center justify-center">
                <span className="text-eco-green-600 font-semibold">
                  {user?.avatar || '🌱'}
                </span>
              </div>
              <span className="text-gray-700 font-medium hidden lg:block">
                {user?.name || 'User'}
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-eco-green-600 hover:bg-eco-green-50 transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2 border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  isActive(item.href)
                    ? 'bg-eco-green-100 text-eco-green-700'
                    : 'text-gray-600 hover:text-eco-green-600 hover:bg-eco-green-50'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            {/* Mobile User Info */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-eco-green-100 rounded-full flex items-center justify-center">
                    <span className="text-eco-green-600 font-semibold">
                      {user?.avatar || '🌱'}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {user?.name || 'User'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-eco-green-50 px-2 py-1 rounded text-xs">
                    <span className="text-eco-green-600 font-semibold">{credits}</span>
                    <span className="text-eco-green-600"> cr</span>
                  </div>
                  <div className="bg-eco-blue-50 px-2 py-1 rounded text-xs">
                    <span className="text-eco-blue-600 font-semibold">Lv.{level}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
