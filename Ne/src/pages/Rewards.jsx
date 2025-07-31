import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

const Rewards = () => {
  const { user } = useAuth();
  const { stats } = useUser();
  const [activeTab, setActiveTab] = useState('achievements');

  const tabs = [
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'badges', label: 'Badges', icon: '🎖️' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '📊' },
    { id: 'rewards', label: 'Rewards', icon: '🎁' }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Sort your first waste item',
      icon: '🌱',
      points: 50,
      unlocked: stats.totalWasteSorted > 0,
      progress: Math.min(stats.totalWasteSorted, 1),
      target: 1
    },
    {
      id: 2,
      title: 'Recycling Champion',
      description: 'Sort 10 recyclable items',
      icon: '♻️',
      points: 100,
      unlocked: stats.totalWasteSorted >= 10,
      progress: Math.min(stats.totalWasteSorted, 10),
      target: 10
    },
    {
      id: 3,
      title: 'Streak Master',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      points: 200,
      unlocked: false, // This would be calculated from actual streak data
      progress: 0,
      target: 7
    },
    {
      id: 4,
      title: 'Eco Warrior',
      description: 'Sort 50 items total',
      icon: '🛡️',
      points: 300,
      unlocked: stats.totalWasteSorted >= 50,
      progress: Math.min(stats.totalWasteSorted, 50),
      target: 50
    },
    {
      id: 5,
      title: 'Habit Builder',
      description: 'Complete 5 daily habits',
      icon: '✅',
      points: 150,
      unlocked: false,
      progress: 0,
      target: 5
    },
    {
      id: 6,
      title: 'Perfect Week',
      description: 'Sort waste every day for a week',
      icon: '📅',
      points: 250,
      unlocked: false,
      progress: 0,
      target: 7
    }
  ];

  const badges = [
    {
      id: 1,
      title: 'Newcomer',
      description: 'Welcome to EcoVision!',
      icon: '🌱',
      color: 'bg-green-500',
      unlocked: true
    },
    {
      id: 2,
      title: 'Recycler',
      description: 'Sort 5 recyclable items',
      icon: '♻️',
      color: 'bg-blue-500',
      unlocked: stats.totalWasteSorted >= 5
    },
    {
      id: 3,
      title: 'Organizer',
      description: 'Sort 5 organic items',
      icon: '🍃',
      color: 'bg-green-600',
      unlocked: false
    },
    {
      id: 4,
      title: 'Safety First',
      description: 'Properly dispose of hazardous waste',
      icon: '⚠️',
      color: 'bg-red-500',
      unlocked: false
    },
    {
      id: 5,
      title: 'Consistent',
      description: '3-day sorting streak',
      icon: '🔥',
      color: 'bg-orange-500',
      unlocked: false
    },
    {
      id: 6,
      title: 'Eco Master',
      description: 'Reach 1000 eco points',
      icon: '👑',
      color: 'bg-purple-500',
      unlocked: user?.ecoScore >= 1000
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Green', points: 1250, avatar: '🌱' },
    { rank: 2, name: 'Mike Eco', points: 1100, avatar: '🌿' },
    { rank: 3, name: 'Emma Sustainable', points: 950, avatar: '🍃' },
    { rank: 4, name: 'John Recycle', points: 850, avatar: '♻️' },
    { rank: 5, name: 'Lisa Earth', points: 750, avatar: '🌍' },
    { rank: 6, name: user?.name || 'You', points: user?.ecoScore || 0, avatar: '👤', isCurrentUser: true }
  ].sort((a, b) => b.points - a.points);

  const rewards = [
    {
      id: 1,
      title: 'Eco-Friendly Water Bottle',
      description: 'Reusable stainless steel water bottle',
      points: 500,
      icon: '💧',
      available: stats.totalPoints >= 500
    },
    {
      id: 2,
      title: 'Bamboo Toothbrush Set',
      description: 'Set of 4 biodegradable toothbrushes',
      points: 300,
      icon: '🦷',
      available: stats.totalPoints >= 300
    },
    {
      id: 3,
      title: 'Reusable Shopping Bag',
      description: 'Foldable canvas shopping bag',
      points: 200,
      icon: '🛍️',
      available: stats.totalPoints >= 200
    },
    {
      id: 4,
      title: 'Plant a Tree Certificate',
      description: 'We\'ll plant a tree in your name',
      points: 1000,
      icon: '🌳',
      available: stats.totalPoints >= 1000
    }
  ];

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div key={achievement.id} className={`card ${achievement.unlocked ? 'border-green-200 bg-green-50' : ''}`}>
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                achievement.unlocked ? 'bg-green-500' : 'bg-gray-200'
              }`}>
                <span className="text-2xl">{achievement.icon}</span>
              </div>
              <div>
                <h3 className={`font-semibold ${achievement.unlocked ? 'text-green-800' : 'text-gray-900'}`}>
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{achievement.progress}/{achievement.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    achievement.unlocked ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                  style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Reward</span>
                <span className="text-sm font-semibold text-green-600">+{achievement.points} pts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBadges = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div key={badge.id} className={`card text-center ${badge.unlocked ? 'border-green-200 bg-green-50' : ''}`}>
            <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-3 ${
              !badge.unlocked ? 'opacity-50' : ''
            }`}>
              <span className="text-3xl">{badge.icon}</span>
            </div>
            <h3 className={`font-semibold mb-1 ${badge.unlocked ? 'text-green-800' : 'text-gray-900'}`}>
              {badge.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
            {badge.unlocked ? (
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Unlocked
              </span>
            ) : (
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                Locked
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="space-y-4">
          {leaderboard.map((user, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
              user.isCurrentUser ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg">{user.avatar}</span>
                </div>
                <div>
                  <p className={`font-medium ${user.isCurrentUser ? 'text-green-800' : 'text-gray-900'}`}>
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600">Rank #{user.rank}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">{user.points} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div key={reward.id} className={`card ${reward.available ? 'border-green-200' : 'opacity-75'}`}>
            <div className="text-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                reward.available ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <span className="text-3xl">{reward.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{reward.title}</h3>
              <p className="text-sm text-gray-600">{reward.description}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cost</span>
              <span className="font-semibold text-green-600">{reward.points} pts</span>
            </div>
            
            <button
              className={`w-full mt-4 btn ${
                reward.available ? 'btn-primary' : 'btn-secondary'
              }`}
              disabled={!reward.available}
            >
              {reward.available ? 'Redeem' : 'Not enough points'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards & Achievements</h1>
          <p className="text-gray-600">
            Track your progress and unlock rewards for your sustainable actions
          </p>
        </div>

        {/* Points Summary */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">{user?.ecoScore || 0}</p>
              <p className="text-sm text-gray-600">Eco Score</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.totalPoints}</p>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {achievements.filter(a => a.unlocked).length}
              </p>
              <p className="text-sm text-gray-600">Achievements Unlocked</p>
            </div>
          </div>
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
          {activeTab === 'achievements' && renderAchievements()}
          {activeTab === 'badges' && renderBadges()}
          {activeTab === 'leaderboard' && renderLeaderboard()}
          {activeTab === 'rewards' && renderRewards()}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
