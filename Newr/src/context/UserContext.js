import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPoints: 0,
    totalWasteSorted: 0,
    currentStreak: 0,
    longestStreak: 0,
    level: 1,
    ecoScore: 0,
    achievements: [],
    badges: []
  });

  // Load user stats from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedStats = localStorage.getItem(`ecovision_stats_${user.id}`);
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      } else {
        // Initialize with default stats for new users
        const defaultStats = {
          totalPoints: 0,
          totalWasteSorted: 0,
          currentStreak: 0,
          longestStreak: 0,
          level: 1,
          ecoScore: 0,
          achievements: [],
          badges: []
        };
        setStats(defaultStats);
        localStorage.setItem(`ecovision_stats_${user.id}`, JSON.stringify(defaultStats));
      }
    }
  }, [user]);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`ecovision_stats_${user.id}`, JSON.stringify(stats));
    }
  }, [stats, user]);

  // Add points to user's total
  const addPoints = (points) => {
    setStats(prev => {
      const newTotalPoints = prev.totalPoints + points;
      const newLevel = Math.floor(newTotalPoints / 100) + 1;
      const newEcoScore = Math.min(100, Math.floor((newTotalPoints / 1000) * 100));
      
      return {
        ...prev,
        totalPoints: newTotalPoints,
        level: newLevel,
        ecoScore: newEcoScore
      };
    });
  };

  // Increment waste sorted count
  const incrementWasteSorted = (count = 1) => {
    setStats(prev => ({
      ...prev,
      totalWasteSorted: prev.totalWasteSorted + count
    }));
  };

  // Update streak information
  const updateStreak = (newStreak) => {
    setStats(prev => ({
      ...prev,
      currentStreak: newStreak,
      longestStreak: Math.max(prev.longestStreak, newStreak)
    }));
  };

  // Add achievement
  const addAchievement = (achievement) => {
    setStats(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievement]
    }));
  };

  // Add badge
  const addBadge = (badge) => {
    setStats(prev => ({
      ...prev,
      badges: [...prev.badges, badge]
    }));
  };

  // Reset daily stats (called at midnight)
  const resetDailyStats = () => {
    // This would be called by a daily reset mechanism
    // For now, we'll keep it simple
  };

  // Get user level information
  const getLevelInfo = (level) => {
    const levelNames = [
      'Eco Beginner',
      'Green Enthusiast', 
      'Sustainability Seeker',
      'Environmental Advocate',
      'Eco Warrior',
      'Planet Protector',
      'Climate Champion',
      'Earth Guardian',
      'Sustainability Master',
      'Eco Legend'
    ];
    
    return {
      name: levelNames[Math.min(level - 1, levelNames.length - 1)],
      progress: stats.totalPoints % 100,
      nextLevel: level * 100
    };
  };

  // Calculate achievements based on current stats
  const checkAchievements = () => {
    const newAchievements = [];
    
    // Points-based achievements
    if (stats.totalPoints >= 100 && !stats.achievements.find(a => a.id === 'first_100')) {
      newAchievements.push({
        id: 'first_100',
        title: 'First Steps',
        description: 'Earned your first 100 points',
        icon: '🌟',
        points: 10
      });
    }
    
    if (stats.totalPoints >= 500 && !stats.achievements.find(a => a.id === 'eco_500')) {
      newAchievements.push({
        id: 'eco_500',
        title: 'Eco Enthusiast',
        description: 'Earned 500 points',
        icon: '🌱',
        points: 25
      });
    }
    
    if (stats.totalPoints >= 1000 && !stats.achievements.find(a => a.id === 'eco_1000')) {
      newAchievements.push({
        id: 'eco_1000',
        title: 'Green Guardian',
        description: 'Earned 1000 points',
        icon: '🌍',
        points: 50
      });
    }
    
    // Streak-based achievements
    if (stats.currentStreak >= 7 && !stats.achievements.find(a => a.id === 'week_streak')) {
      newAchievements.push({
        id: 'week_streak',
        title: 'Week Warrior',
        description: 'Maintained a 7-day streak',
        icon: '🔥',
        points: 30
      });
    }
    
    if (stats.currentStreak >= 30 && !stats.achievements.find(a => a.id === 'month_streak')) {
      newAchievements.push({
        id: 'month_streak',
        title: 'Monthly Master',
        description: 'Maintained a 30-day streak',
        icon: '🏆',
        points: 100
      });
    }
    
    // Waste sorting achievements
    if (stats.totalWasteSorted >= 50 && !stats.achievements.find(a => a.id === 'waste_50')) {
      newAchievements.push({
        id: 'waste_50',
        title: 'Waste Warrior',
        description: 'Sorted 50 waste items',
        icon: '♻️',
        points: 20
      });
    }
    
    if (stats.totalWasteSorted >= 100 && !stats.achievements.find(a => a.id === 'waste_100')) {
      newAchievements.push({
        id: 'waste_100',
        title: 'Century Sorter',
        description: 'Sorted 100 waste items',
        icon: '💯',
        points: 40
      });
    }
    
    // Add new achievements and award points
    newAchievements.forEach(achievement => {
      addAchievement(achievement);
      addPoints(achievement.points);
    });
  };

  // Check for new achievements whenever stats change
  useEffect(() => {
    if (user) {
      checkAchievements();
    }
  }, [stats.totalPoints, stats.currentStreak, stats.totalWasteSorted, user]);

  const value = {
    stats,
    addPoints,
    incrementWasteSorted,
    updateStreak,
    addAchievement,
    addBadge,
    resetDailyStats,
    getLevelInfo
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
