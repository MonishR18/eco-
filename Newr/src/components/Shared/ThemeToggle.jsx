import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('ecovision_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ecovision_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ecovision_theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Track */}
      <div className="relative w-full h-full">
        {/* Sun Icon */}
        <div className={`absolute top-1 left-1 w-4 h-4 transition-all duration-200 ${
          isDark ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}>
          <span className="text-yellow-500 text-sm">☀️</span>
        </div>
        
        {/* Moon Icon */}
        <div className={`absolute top-1 right-1 w-4 h-4 transition-all duration-200 ${
          isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}>
          <span className="text-blue-400 text-sm">🌙</span>
        </div>
        
        {/* Toggle Handle */}
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}>
          {/* Handle Icon */}
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs">
              {isDark ? '🌙' : '☀️'}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
