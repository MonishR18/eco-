import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useUser } from './UserContext';

const TrackerContext = createContext();

export const useTracker = () => {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
};

export const TrackerProvider = ({ children }) => {
  const { user } = useAuth();
  const { addPoints, incrementWasteSorted, updateStreak } = useUser();
  
  const [wasteEntries, setWasteEntries] = useState([]);
  const [habits, setHabits] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [weeklyStats, setWeeklyStats] = useState({
    recyclable: 0,
    organic: 0,
    general: 0,
    hazardous: 0
  });

  useEffect(() => {
    if (user) {
      // Load waste entries from localStorage
      const savedEntries = localStorage.getItem(`ecovision_waste_${user.id}`);
      if (savedEntries) {
        setWasteEntries(JSON.parse(savedEntries));
      }

      // Load habits from localStorage
      const savedHabits = localStorage.getItem(`ecovision_habits_${user.id}`);
      if (savedHabits) {
        setHabits(JSON.parse(savedHabits));
      } else {
        // Initialize default habits
        const defaultHabits = [
          { id: 1, name: 'Use reusable water bottle', completed: false, points: 10 },
          { id: 2, name: 'Bring own shopping bag', completed: false, points: 15 },
          { id: 3, name: 'Sort waste properly', completed: false, points: 20 },
          { id: 4, name: 'Use public transport', completed: false, points: 25 },
          { id: 5, name: 'Turn off unused lights', completed: false, points: 10 }
        ];
        setHabits(defaultHabits);
        localStorage.setItem(`ecovision_habits_${user.id}`, JSON.stringify(defaultHabits));
      }
    }
  }, [user]);

  useEffect(() => {
    // Calculate weekly stats
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weeklyEntries = wasteEntries.filter(entry => 
      new Date(entry.date) >= weekAgo
    );

    const stats = weeklyEntries.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + entry.amount;
      return acc;
    }, {});

    setWeeklyStats({
      recyclable: stats.recyclable || 0,
      organic: stats.organic || 0,
      general: stats.general || 0,
      hazardous: stats.hazardous || 0
    });
  }, [wasteEntries]);

  const addWasteEntry = (type, amount, description = '') => {
    const newEntry = {
      id: Date.now(),
      type,
      amount,
      description,
      date: new Date().toISOString(),
      points: calculatePoints(type, amount)
    };

    const updatedEntries = [...wasteEntries, newEntry];
    setWasteEntries(updatedEntries);
    
    if (user) {
      localStorage.setItem(`ecovision_waste_${user.id}`, JSON.stringify(updatedEntries));
    }

    // Update stats
    incrementWasteSorted(amount);
    addPoints(newEntry.points);

    // Update streak
    updateDailyStreak();

    return newEntry;
  };

  const calculatePoints = (type, amount) => {
    const basePoints = {
      recyclable: 20,
      organic: 15,
      general: 5,
      hazardous: 30
    };
    return basePoints[type] * amount;
  };

  const updateDailyStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    const todayEntries = wasteEntries.filter(entry => 
      new Date(entry.date).toDateString() === today
    );
    
    const yesterdayEntries = wasteEntries.filter(entry => 
      new Date(entry.date).toDateString() === yesterday
    );

    if (todayEntries.length > 0) {
      if (yesterdayEntries.length > 0) {
        setCurrentStreak(prev => prev + 1);
        updateStreak(currentStreak + 1);
      } else {
        setCurrentStreak(1);
        updateStreak(1);
      }
    }
  };

  const completeHabit = (habitId) => {
    const updatedHabits = habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: true }
        : habit
    );
    
    setHabits(updatedHabits);
    
    if (user) {
      localStorage.setItem(`ecovision_habits_${user.id}`, JSON.stringify(updatedHabits));
    }

    // Add points for completed habit
    const habit = habits.find(h => h.id === habitId);
    if (habit && !habit.completed) {
      addPoints(habit.points);
    }
  };

  const resetDailyHabits = () => {
    const updatedHabits = habits.map(habit => ({
      ...habit,
      completed: false
    }));
    
    setHabits(updatedHabits);
    
    if (user) {
      localStorage.setItem(`ecovision_habits_${user.id}`, JSON.stringify(updatedHabits));
    }
  };

  const getWasteStats = () => {
    const total = wasteEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const byType = wasteEntries.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + entry.amount;
      return acc;
    }, {});

    return {
      total,
      byType,
      entries: wasteEntries.length
    };
  };

  const value = {
    wasteEntries,
    habits,
    currentStreak,
    weeklyStats,
    addWasteEntry,
    completeHabit,
    resetDailyHabits,
    getWasteStats
  };

  return (
    <TrackerContext.Provider value={value}>
      {children}
    </TrackerContext.Provider>
  );
};
