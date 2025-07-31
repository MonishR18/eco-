import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Shared.css';

const ThemeSelector = () => {
  const { currentTheme, themes, changeTheme, isDark, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
    setIsOpen(false);
  };

  const currentThemeData = themes[currentTheme];

  return (
    <div className="theme-selector">
      {/* Main Theme Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-option active bg-theme-gradient"
        title={`Current theme: ${currentThemeData.name}`}
      >
        {currentThemeData.icon}
      </button>

      {/* Theme Options Dropdown */}
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 min-w-[200px]">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Choose Theme
          </div>
          
          <div className="space-y-2">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                  currentTheme === key
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                  style={{ background: theme.gradient }}
                >
                  {theme.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {theme.name}
                </span>
                {currentTheme === key && (
                  <span className="ml-auto text-green-500">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Dark Mode
              </span>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex items-center justify-center w-10 h-6 rounded-full transition-colors duration-200 ${
                  isDark ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ${
                    isDark ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Theme Preview */}
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Preview
            </div>
            <div className="flex space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ background: currentThemeData.primary }}
              />
              <div
                className="w-4 h-4 rounded-full"
                style={{ background: currentThemeData.accent }}
              />
              <div
                className="w-4 h-4 rounded-full"
                style={{ background: currentThemeData.secondary }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeSelector; 