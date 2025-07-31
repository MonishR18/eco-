import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Award, Target, Calendar, Leaf } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTracker } from '../context/TrackerContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { credits, level, experience, badges, streak } = useUser();
  const { totalItems, categories, sectors, getTodayStats, getWeeklyStats } = useTracker();

  const todayStats = getTodayStats();
  const weeklyStats = getWeeklyStats();

  const categoryData = Object.entries(categories).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: getCategoryColor(name)
  }));

  const sectorData = Object.entries(sectors).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: getSectorColor(name)
  }));

  const weeklyData = [
    { day: 'Mon', items: 3 },
    { day: 'Tue', items: 5 },
    { day: 'Wed', items: 2 },
    { day: 'Thu', items: 7 },
    { day: 'Fri', items: 4 },
    { day: 'Sat', items: 6 },
    { day: 'Sun', items: 1 }
  ];

  function getCategoryColor(category) {
    const colors = {
      plastic: '#3b82f6',
      organic: '#22c55e',
      'e-waste': '#f59e0b',
      paper: '#8b5cf6',
      glass: '#06b6d4',
      metal: '#64748b'
    };
    return colors[category] || '#3b82f6';
  }

  function getSectorColor(sector) {
    const colors = {
      household: '#22c55e',
      industrial: '#3b82f6',
      campus: '#8b5cf6'
    };
    return colors[sector] || '#22c55e';
  }

  const stats = [
    {
      title: 'Total Items Sorted',
      value: totalItems,
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-eco-green-500',
      change: '+12% this week'
    },
    {
      title: 'Current Streak',
      value: streak,
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-eco-blue-500',
      change: 'Keep it up!'
    },
    {
      title: 'Eco Credits',
      value: credits,
      icon: <Award className="w-6 h-6" />,
      color: 'bg-purple-500',
      change: '+25 this week'
    },
    {
      title: 'Level',
      value: level,
      icon: <Target className="w-6 h-6" />,
      color: 'bg-orange-500',
      change: `${experience}/100 XP`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your environmental impact and progress</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  {stat.icon}
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600 mb-2">{stat.title}</p>
              <p className="text-sm text-green-600">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="items" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Waste Categories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Waste Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Activity & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {todayStats.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-eco-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-eco-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{item.category} • {item.sector}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {todayStats.length === 0 && (
                <p className="text-gray-500 text-center py-8">No activity today. Start sorting waste!</p>
              )}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h3>
            <div className="space-y-4">
              {badges.length > 0 ? (
                badges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-eco-green-50 to-eco-blue-50 rounded-lg">
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <p className="font-medium text-gray-800">{badge.name}</p>
                      <p className="text-sm text-gray-600">Unlocked!</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No achievements yet. Keep sorting to unlock badges!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 