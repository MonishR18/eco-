import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { useUser } from '../context/UserContext';

const Tracker = () => {
  const { wasteEntries, habits, currentStreak, weeklyStats, completeHabit, resetDailyHabits } = useTracker();
  const { stats } = useUser();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'habits', label: 'Daily Habits', icon: '✅' },
    { id: 'history', label: 'History', icon: '📅' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  const getWasteStats = () => {
    const total = wasteEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const byType = wasteEntries.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + entry.amount;
      return acc;
    }, {});

    return { total, byType };
  };

  const wasteStats = getWasteStats();

  const getWeeklyProgress = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayEntries = wasteEntries.filter(entry => 
        new Date(entry.date).toDateString() === date.toDateString()
      );
      weekData.push({
        day: days[date.getDay()],
        count: dayEntries.length,
        items: dayEntries.reduce((sum, entry) => sum + entry.amount, 0)
      });
    }

    return weekData;
  };

  const weekData = getWeeklyProgress();

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items Sorted</p>
              <p className="text-2xl font-bold text-green-600">{wasteStats.total}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">♻️</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-orange-600">{currentStreak} days</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-blue-600">
                {Object.values(weeklyStats).reduce((sum, val) => sum + val, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalPoints}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
        <div className="space-y-4">
          {weekData.map((day, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((day.count / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{day.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Waste Type Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Waste Type Breakdown</h3>
        <div className="space-y-4">
          {Object.entries(wasteStats.byType).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  type === 'recyclable' ? 'bg-blue-100' :
                  type === 'organic' ? 'bg-green-100' :
                  type === 'hazardous' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <span className="text-sm">
                    {type === 'recyclable' ? '♻️' :
                     type === 'organic' ? '🍃' :
                     type === 'hazardous' ? '⚠️' : '🗑️'}
                  </span>
                </div>
                <span className="font-medium capitalize">{type}</span>
              </div>
              <span className="font-semibold">{count} items</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHabits = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Daily Habits</h3>
        <button
          onClick={resetDailyHabits}
          className="btn btn-outline text-sm"
        >
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((habit) => (
          <div key={habit.id} className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => completeHabit(habit.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    habit.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {habit.completed && <span className="text-white text-xs">✓</span>}
                </button>
                <div>
                  <h4 className={`font-medium ${habit.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {habit.name}
                  </h4>
                  <p className="text-sm text-green-600">+{habit.points} points</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Habit Tips</h4>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• Complete habits daily to build sustainable routines</li>
          <li>• Each habit gives you points towards your eco score</li>
          <li>• Habits reset daily to encourage consistent behavior</li>
          <li>• Focus on small changes that make a big impact</li>
        </ul>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      
      {wasteEntries.length > 0 ? (
        <div className="space-y-4">
          {wasteEntries.slice().reverse().map((entry) => (
            <div key={entry.id} className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    entry.type === 'recyclable' ? 'bg-blue-100' :
                    entry.type === 'organic' ? 'bg-green-100' :
                    entry.type === 'hazardous' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <span className="text-lg">
                      {entry.type === 'recyclable' ? '♻️' :
                       entry.type === 'organic' ? '🍃' :
                       entry.type === 'hazardous' ? '⚠️' : '🗑️'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{entry.type}</p>
                    <p className="text-sm text-gray-600">
                      {entry.description || 'Waste item'} • {entry.amount} item(s)
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(entry.date).toLocaleDateString()} at {new Date(entry.date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+{entry.points} pts</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-gray-600">No activity yet. Start sorting waste to see your history!</p>
        </div>
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Detailed Analytics</h3>
      
      {/* Monthly Progress */}
      <div className="card">
        <h4 className="font-semibold text-gray-900 mb-4">Monthly Progress</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Items Sorted This Month</p>
            <p className="text-3xl font-bold text-green-600">{wasteStats.total}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Average Daily Items</p>
            <p className="text-3xl font-bold text-blue-600">
              {wasteEntries.length > 0 ? Math.round(wasteStats.total / Math.max(wasteEntries.length, 1)) : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Efficiency Score */}
      <div className="card">
        <h4 className="font-semibold text-gray-900 mb-4">Sorting Efficiency</h4>
        <div className="space-y-4">
          {Object.entries(wasteStats.byType).map(([type, count]) => {
            const percentage = Math.round((count / wasteStats.total) * 100);
            return (
              <div key={type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{type}</span>
                  <span>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      type === 'recyclable' ? 'bg-blue-500' :
                      type === 'organic' ? 'bg-green-500' :
                      type === 'hazardous' ? 'bg-red-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="card bg-green-50 border border-green-200">
        <h4 className="font-semibold text-green-900 mb-4">🌱 Environmental Impact</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">{Math.round(wasteStats.total * 0.5)}</p>
            <p className="text-sm text-green-700">kg CO2 saved</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{Math.round(wasteStats.total * 0.3)}</p>
            <p className="text-sm text-green-700">trees equivalent</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{Math.round(wasteStats.total * 2)}</p>
            <p className="text-sm text-green-700">liters water saved</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Tracker</h1>
          <p className="text-gray-600">
            Monitor your waste sorting progress and environmental impact
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="fade-in">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'habits' && renderHabits()}
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </div>
    </div>
  );
};

export default Tracker;
