// Local storage utilities for EcoVision PWA

const STORAGE_KEYS = {
  ECO_POINTS: 'ecovision_eco_points',
  BADGES: 'ecovision_badges',
  SORTING_HISTORY: 'ecovision_sorting_history',
  USER_PREFERENCES: 'ecovision_preferences',
  OFFLINE_DATA: 'ecovision_offline_data'
};

export const getEcoPoints = () => {
  try {
    const points = localStorage.getItem(STORAGE_KEYS.ECO_POINTS);
    return points ? parseInt(points, 10) : 0;
  } catch (error) {
    console.error('Error reading eco points:', error);
    return 0;
  }
};

export const addEcoPoints = (points) => {
  try {
    const currentPoints = getEcoPoints();
    const newPoints = currentPoints + points;
    localStorage.setItem(STORAGE_KEYS.ECO_POINTS, newPoints.toString());
    return newPoints;
  } catch (error) {
    console.error('Error adding eco points:', error);
    return getEcoPoints();
  }
};

export const getSortingHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.SORTING_HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error reading sorting history:', error);
    return [];
  }
};

export const addSortingRecord = (record) => {
  try {
    const history = getSortingHistory();
    const newRecord = {
      ...record,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };
    history.unshift(newRecord);
    
    // Keep only last 100 records
    if (history.length > 100) {
      history.splice(100);
    }
    
    localStorage.setItem(STORAGE_KEYS.SORTING_HISTORY, JSON.stringify(history));
    return history;
  } catch (error) {
    console.error('Error adding sorting record:', error);
    return getSortingHistory();
  }
};

export const getUserPreferences = () => {
  try {
    const preferences = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return preferences ? JSON.parse(preferences) : {
      notifications: true,
      darkMode: false,
      autoSort: false,
      language: 'en'
    };
  } catch (error) {
    console.error('Error reading user preferences:', error);
    return {
      notifications: true,
      darkMode: false,
      autoSort: false,
      language: 'en'
    };
  }
};

export const updateUserPreferences = (newPreferences) => {
  try {
    const currentPreferences = getUserPreferences();
    const updatedPreferences = { ...currentPreferences, ...newPreferences };
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updatedPreferences));
    return updatedPreferences;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return getUserPreferences();
  }
};

export const getWasteStats = () => {
  try {
    const history = getSortingHistory();
    const stats = {
      total: history.length,
      byType: {},
      byDate: {},
      totalPoints: getEcoPoints()
    };
    
    history.forEach(record => {
      // Count by waste type
      stats.byType[record.wasteType] = (stats.byType[record.wasteType] || 0) + 1;
      
      // Count by date
      const date = new Date(record.timestamp).toDateString();
      stats.byDate[date] = (stats.byDate[date] || 0) + 1;
    });
    
    return stats;
  } catch (error) {
    console.error('Error calculating waste stats:', error);
    return {
      total: 0,
      byType: {},
      byDate: {},
      totalPoints: 0
    };
  }
};

export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

export const exportUserData = () => {
  try {
    const data = {
      ecoPoints: getEcoPoints(),
      sortingHistory: getSortingHistory(),
      userPreferences: getUserPreferences(),
      wasteStats: getWasteStats(),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecovision-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting user data:', error);
    return false;
  }
};

// Check if app is running offline
export const isOffline = () => {
  return !navigator.onLine;
};

// Store data for offline use
export const storeOfflineData = (key, data) => {
  try {
    const offlineData = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFLINE_DATA) || '{}');
    offlineData[key] = {
      data,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.OFFLINE_DATA, JSON.stringify(offlineData));
  } catch (error) {
    console.error('Error storing offline data:', error);
  }
};

// Retrieve offline data
export const getOfflineData = (key) => {
  try {
    const offlineData = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFLINE_DATA) || '{}');
    return offlineData[key]?.data || null;
  } catch (error) {
    console.error('Error retrieving offline data:', error);
    return null;
  }
}; 