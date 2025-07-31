import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemePreview = () => {
  const { themes, currentTheme, changeTheme } = useTheme();

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Available Themes
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(themes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => changeTheme(key)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              currentTheme === key
                ? 'border-gray-400 shadow-lg scale-105'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl"
                style={{ background: theme.gradient }}
              >
                {theme.icon}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {theme.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {currentTheme === key ? 'Active' : 'Click to apply'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemePreview; 