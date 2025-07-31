import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  ocean: {
    name: 'Ocean Blue',
    primary: '#0ea5e9',
    primaryRgb: '14, 165, 233',
    primaryHover: '#0284c7',
    secondary: '#0c4a6e',
    accent: '#06b6d4',
    accentRgb: '6, 182, 212',
    background: '#f0f9ff',
    cardBg: '#ffffff',
    text: '#0f172a',
    textSecondary: '#475569',
    success: '#10b981',
    successRgb: '16, 185, 129',
    warning: '#f59e0b',
    error: '#ef4444',
    errorRgb: '239, 68, 68',
    border: '#e2e8f0',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
    icon: '🌊'
  },
  forest: {
    name: 'Forest Green',
    primary: '#10b981',
    primaryRgb: '16, 185, 129',
    primaryHover: '#059669',
    secondary: '#065f46',
    accent: '#34d399',
    accentRgb: '52, 211, 153',
    background: '#f0fdf4',
    cardBg: '#ffffff',
    text: '#0f172a',
    textSecondary: '#475569',
    success: '#10b981',
    successRgb: '16, 185, 129',
    warning: '#f59e0b',
    error: '#ef4444',
    errorRgb: '239, 68, 68',
    border: '#e2e8f0',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    icon: '🌱'
  },
  sunset: {
    name: 'Sunset Orange',
    primary: '#f97316',
    primaryRgb: '249, 115, 22',
    primaryHover: '#ea580c',
    secondary: '#9a3412',
    accent: '#fb923c',
    accentRgb: '251, 146, 60',
    background: '#fff7ed',
    cardBg: '#ffffff',
    text: '#0f172a',
    textSecondary: '#475569',
    success: '#10b981',
    successRgb: '16, 185, 129',
    warning: '#f59e0b',
    error: '#ef4444',
    errorRgb: '239, 68, 68',
    border: '#e2e8f0',
    gradient: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
    icon: '🌅'
  },
  purple: {
    name: 'Purple Dream',
    primary: '#8b5cf6',
    primaryRgb: '139, 92, 246',
    primaryHover: '#7c3aed',
    secondary: '#5b21b6',
    accent: '#a78bfa',
    accentRgb: '167, 139, 250',
    background: '#faf5ff',
    cardBg: '#ffffff',
    text: '#0f172a',
    textSecondary: '#475569',
    success: '#10b981',
    successRgb: '16, 185, 129',
    warning: '#f59e0b',
    error: '#ef4444',
    errorRgb: '239, 68, 68',
    border: '#e2e8f0',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
    icon: '✨'
  },
  earth: {
    name: 'Earth Brown',
    primary: '#a16207',
    primaryRgb: '161, 98, 7',
    primaryHover: '#92400e',
    secondary: '#451a03',
    accent: '#d97706',
    accentRgb: '217, 119, 6',
    background: '#fefce8',
    cardBg: '#ffffff',
    text: '#0f172a',
    textSecondary: '#475569',
    success: '#10b981',
    successRgb: '16, 185, 129',
    warning: '#f59e0b',
    error: '#ef4444',
    errorRgb: '239, 68, 68',
    border: '#e2e8f0',
    gradient: 'linear-gradient(135deg, #a16207 0%, #d97706 100%)',
    icon: '🌍'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('forest');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load saved theme preferences
    const savedTheme = localStorage.getItem('ecovision_theme');
    const savedColorTheme = localStorage.getItem('ecovision_color_theme');
    
    if (savedColorTheme && themes[savedColorTheme]) {
      setCurrentTheme(savedColorTheme);
    }
    
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme to CSS custom properties
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--primary-color-rgb', theme.primaryRgb || '16, 185, 129');
    root.style.setProperty('--primary-hover', theme.primaryHover);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--accent-color', theme.accent);
    root.style.setProperty('--accent-color-rgb', theme.accentRgb || '52, 211, 153');
    root.style.setProperty('--background-color', theme.background);
    root.style.setProperty('--card-bg', theme.cardBg);
    root.style.setProperty('--text-color', theme.text);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--success-color', theme.success);
    root.style.setProperty('--success-color-rgb', theme.successRgb || '16, 185, 129');
    root.style.setProperty('--warning-color', theme.warning);
    root.style.setProperty('--error-color', theme.error);
    root.style.setProperty('--error-color-rgb', theme.errorRgb || '239, 68, 68');
    root.style.setProperty('--border-color', theme.border);
    root.style.setProperty('--gradient', theme.gradient);
    
    // Save theme preference
    localStorage.setItem('ecovision_color_theme', currentTheme);
  }, [currentTheme]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ecovision_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ecovision_theme', 'light');
    }
  };

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    themes,
    isDark,
    toggleDarkMode,
    changeTheme,
    getCurrentTheme: () => themes[currentTheme]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 