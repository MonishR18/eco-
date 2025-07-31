import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TrackerContext = createContext();

const initialState = {
  wasteHistory: [],
  dailyStats: {},
  weeklyStats: {},
  monthlyStats: {},
  totalItems: 0,
  categories: {
    plastic: 0,
    organic: 0,
    'e-waste': 0,
    paper: 0,
    glass: 0,
    metal: 0
  },
  sectors: {
    household: 0,
    industrial: 0,
    campus: 0
  }
};

const trackerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_WASTE_ITEM':
      const newItem = {
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        date: new Date().toDateString()
      };
      
      const updatedHistory = [newItem, ...state.wasteHistory];
      const updatedCategories = {
        ...state.categories,
        [newItem.category]: state.categories[newItem.category] + 1
      };
      const updatedSectors = {
        ...state.sectors,
        [newItem.sector]: state.sectors[newItem.sector] + 1
      };
      
      return {
        ...state,
        wasteHistory: updatedHistory,
        totalItems: state.totalItems + 1,
        categories: updatedCategories,
        sectors: updatedSectors
      };
    
    case 'UPDATE_STATS':
      return {
        ...state,
        dailyStats: action.payload.daily || state.dailyStats,
        weeklyStats: action.payload.weekly || state.weeklyStats,
        monthlyStats: action.payload.monthly || state.monthlyStats
      };
    
    case 'LOAD_TRACKER_DATA':
      return { ...state, ...action.payload };
    
    case 'CLEAR_HISTORY':
      return {
        ...initialState,
        wasteHistory: [],
        totalItems: 0
      };
    
    default:
      return state;
  }
};

export const TrackerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trackerReducer, initialState);

  // Load tracker data from localStorage on mount
  useEffect(() => {
    const savedTrackerData = localStorage.getItem('ecovision_tracker');
    if (savedTrackerData) {
      try {
        const trackerData = JSON.parse(savedTrackerData);
        dispatch({ type: 'LOAD_TRACKER_DATA', payload: trackerData });
      } catch (error) {
        console.error('Error loading tracker data:', error);
      }
    }
  }, []);

  // Save tracker data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('ecovision_tracker', JSON.stringify(state));
  }, [state]);

  const addWasteItem = (item) => {
    dispatch({ type: 'ADD_WASTE_ITEM', payload: item });
  };

  const updateStats = (stats) => {
    dispatch({ type: 'UPDATE_STATS', payload: stats });
  };

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
  };

  const getTodayStats = () => {
    const today = new Date().toDateString();
    return state.wasteHistory.filter(item => item.date === today);
  };

  const getWeeklyStats = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return state.wasteHistory.filter(item => 
      new Date(item.timestamp) >= oneWeekAgo
    );
  };

  const getMonthlyStats = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return state.wasteHistory.filter(item => 
      new Date(item.timestamp) >= oneMonthAgo
    );
  };

  const getCategoryStats = () => {
    return state.categories;
  };

  const getSectorStats = () => {
    return state.sectors;
  };

  const value = {
    ...state,
    addWasteItem,
    updateStats,
    clearHistory,
    getTodayStats,
    getWeeklyStats,
    getMonthlyStats,
    getCategoryStats,
    getSectorStats
  };

  return (
    <TrackerContext.Provider value={value}>
      {children}
    </TrackerContext.Provider>
  );
};

export const useTracker = () => {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
};
