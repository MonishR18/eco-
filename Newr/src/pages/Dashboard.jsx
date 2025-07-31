import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useTracker } from '../context/TrackerContext';
import { useTheme } from '../context/ThemeContext';
import ThemePreview from '../components/Shared/ThemePreview';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { stats } = useUser();
  const { weeklyStats, currentStreak, habits, wasteEntries } = useTracker();
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();

  const getLevelInfo = (score) => {
    if (score < 100) return { level: 'Beginner', color: 'bg-green-500' };
    if (score < 300) return { level: 'Intermediate', color: 'bg-blue-500' };
    if (score < 600) return { level: 'Advanced', color: 'bg-purple-500' };
    return { level: 'Expert', color: 'bg-yellow-500' };
  };

  const quickActions = [
    {
      title: 'Sort Waste',
      description: 'Use AI to sort your waste',
      icon: '♻️',
      path: '/sort-waste',
      color: 'bg-green-500'
    },
    {
      title: 'Track Progress',
      description: 'View your statistics',
      icon: '📊',
      path: '/tracker',
      color: 'bg-blue-500'
    },
    {
      title: 'Join Community',
      description: 'Connect with others',
      icon: '👥',
      path: '/community',
      color: 'bg-purple-500'
    },
    {
      title: 'Learn More',
      description: 'Educational content',
      icon: '📚',
      path: '/education',
      color: 'bg-yellow-500'
    }
  ];

  const recentEntries = wasteEntries.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Keep up the great work on your sustainability journey!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Eco Score</p>
              <p className="text-2xl font-bold text-theme-primary">
                {user?.ecoScore || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-theme-primary bg-opacity-20">
              <span className="text-2xl">🌿</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Waste</p>
              <p className="text-2xl font-bold text-theme-primary">
                {stats?.totalWaste || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500 bg-opacity-20">
              <span className="text-2xl">📦</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</p>
              <p className="text-2xl font-bold text-theme-primary">
                {currentStreak} days
              </p>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-500 bg-opacity-20">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Level</p>
              <p className="text-2xl font-bold text-theme-primary">
                {getLevelInfo(user?.ecoScore || 0).level}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-500 bg-opacity-20">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="card hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white`}>
                  <span className="text-lg">{action.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Theme Preview Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Customize Your Theme</h2>
        <ThemePreview />
      </div>

      {/* Weekly Stats and Daily Habits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Progress</h3>
          <div className="space-y-3">
            {Object.entries(weeklyStats).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 capitalize">{type}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-theme-primary"
                      style={{
                        width: `${Math.min((count / 10) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Habits</h3>
          <div className="space-y-3">
            {habits.map((habit) => (
              <div key={habit.id} className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{habit.title}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  habit.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {habit.completed && <span className="text-white text-xs">✓</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="card">
          {recentEntries.length > 0 ? (
            <div className="space-y-3">
              {recentEntries.map((entry, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">♻️</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{entry.type}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{entry.amount} items</p>
                    <p className="text-sm text-green-600">+{entry.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
              <Link
                to="/sort-waste"
                className="btn btn-theme-primary mt-4"
              >
                Start Sorting Waste
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
