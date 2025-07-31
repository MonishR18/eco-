import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Gift, Target, Users } from 'lucide-react';
import { useUser } from '../context/UserContext';
import rewardsData from '../data/rewards.json';

const Rewards = () => {
  const { credits, level, experience, badges, rewards } = useUser();

  const unlockedRewards = rewardsData.rewards.filter(reward => 
    rewards.some(userReward => userReward.id === reward.id)
  );

  const lockedRewards = rewardsData.rewards.filter(reward => 
    !rewards.some(userReward => userReward.id === reward.id)
  );

  const currentBadge = rewardsData.badges.find(badge => {
    if (badge.name === 'Master') return totalItems >= 100;
    if (badge.name === 'Advanced') return totalItems >= 50;
    if (badge.name === 'Intermediate') return totalItems >= 10;
    return totalItems >= 1;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Rewards & Achievements</h1>
          <p className="text-gray-600">Track your progress and unlock amazing rewards</p>
        </motion.div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-eco-green-400 to-eco-green-600 text-white rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-eco-green-100">Total Credits</p>
                <p className="text-3xl font-bold">{credits}</p>
              </div>
              <Gift className="w-8 h-8" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-eco-blue-400 to-eco-blue-600 text-white rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-eco-blue-100">Current Level</p>
                <p className="text-3xl font-bold">{level}</p>
              </div>
              <Target className="w-8 h-8" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Experience</p>
                <p className="text-3xl font-bold">{experience}</p>
              </div>
              <Star className="w-8 h-8" />
            </div>
          </motion.div>
        </div>

        {/* Current Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Badge</h2>
          <div className="flex items-center space-x-4">
            <div className="text-6xl">{currentBadge?.icon || '🌱'}</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{currentBadge?.name || 'Beginner'}</h3>
              <p className="text-gray-600">{currentBadge?.description || 'Just getting started'}</p>
              <p className="text-sm text-gray-500 mt-1">Requirement: {currentBadge?.requirement || 'First sort'}</p>
            </div>
          </div>
        </motion.div>

        {/* Unlocked Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Unlocked Rewards</h2>
          {unlockedRewards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlockedRewards.map((reward) => (
                <div key={reward.id} className="bg-gradient-to-r from-eco-green-50 to-eco-blue-50 rounded-lg p-4 border border-eco-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{reward.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{reward.name}</h3>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                      <p className="text-sm text-eco-green-600 font-medium">+{reward.credits} credits</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No rewards unlocked yet. Keep sorting to earn rewards!</p>
            </div>
          )}
        </motion.div>

        {/* Available Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedRewards.map((reward) => (
              <div key={reward.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl opacity-50">{reward.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{reward.name}</h3>
                    <p className="text-sm text-gray-600">{reward.description}</p>
                    <p className="text-sm text-gray-500 font-medium">+{reward.credits} credits</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Rewards; 