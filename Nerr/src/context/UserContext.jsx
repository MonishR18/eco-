import React, { createContext, useContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  user: null,
  credits: 0,
  level: 1,
  experience: 0,
  badges: [],
  rewards: [],
  streak: 0,
  lastLogin: null,
  preferences: {
    sector: 'household',
    language: 'en',
    notifications: true
  }
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_CREDITS':
      return { ...state, credits: state.credits + action.payload };
    
    case 'ADD_EXPERIENCE':
      const newExp = state.experience + action.payload;
      const newLevel = Math.floor(newExp / 100) + 1;
      return { 
        ...state, 
        experience: newExp, 
        level: newLevel 
      };
    
    case 'UNLOCK_BADGE':
      return {
        ...state,
        badges: [...state.badges, action.payload]
      };
    
    case 'UNLOCK_REWARD':
      return {
        ...state,
        rewards: [...state.rewards, action.payload]
      };
    
    case 'UPDATE_STREAK':
      return { ...state, streak: action.payload };
    
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    
    case 'LOAD_USER_DATA':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('ecovision_user');
    if (savedUserData) {
      try {
        const userData = JSON.parse(savedUserData);
        dispatch({ type: 'LOAD_USER_DATA', payload: userData });
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, []);

  // Save user data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('ecovision_user', JSON.stringify(state));
  }, [state]);

  const addCredits = (amount) => {
    dispatch({ type: 'ADD_CREDITS', payload: amount });
  };

  const addExperience = (amount) => {
    dispatch({ type: 'ADD_EXPERIENCE', payload: amount });
  };

  const unlockBadge = (badge) => {
    dispatch({ type: 'UNLOCK_BADGE', payload: badge });
  };

  const unlockReward = (reward) => {
    dispatch({ type: 'UNLOCK_REWARD', payload: reward });
  };

  const updateStreak = (streak) => {
    dispatch({ type: 'UPDATE_STREAK', payload: streak });
  };

  const updatePreferences = (preferences) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  const value = {
    ...state,
    addCredits,
    addExperience,
    unlockBadge,
    unlockReward,
    updateStreak,
    updatePreferences
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
