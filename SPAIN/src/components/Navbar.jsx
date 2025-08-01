import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getEcoPoints } from '../utils/storage';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const ecoPoints = getEcoPoints();

  const navItems = [
    { path: '/', label: '🏠 Home', icon: '🏠' },
    { path: '/sort', label: '📸 Sort Waste', icon: '📸' },
    { path: '/dashboard', label: '📊 Dashboard', icon: '📊' },
    { path: '/awareness', label: '🌍 Awareness', icon: '🌍' },
    { path: '/hardware', label: '⚙️ Hardware', icon: '⚙️' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b-2 border-eco-green-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-3xl">🌱</div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-eco-green-700">EcoVision</h1>
              <p className="text-xs text-eco-green-500">Smart Waste Sorter</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-eco-green-100 text-eco-green-700'
                    : 'text-gray-600 hover:bg-eco-green-50 hover:text-eco-green-600'
                }`}
              >
                <span className="hidden lg:inline">{item.label}</span>
                <span className="lg:hidden">{item.icon}</span>
              </Link>
            ))}
          </div>

          {/* Eco Points Display */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="bg-eco-green-100 px-3 py-1 rounded-full">
              <span className="text-sm font-semibold text-eco-green-700">
                🌟 {ecoPoints} pts
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-eco-green-50 hover:text-eco-green-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-eco-green-100 text-eco-green-700'
                      : 'text-gray-600 hover:bg-eco-green-50 hover:text-eco-green-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Eco Points */}
              <div className="px-4 py-3">
                <div className="bg-eco-green-100 px-3 py-2 rounded-full inline-block">
                  <span className="text-sm font-semibold text-eco-green-700">
                    🌟 {ecoPoints} eco points
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 