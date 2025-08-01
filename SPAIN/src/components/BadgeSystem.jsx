import React from 'react';
import { badges, getCurrentBadge, getNextBadge, getProgressPercentage } from '../data/badges';

const BadgeSystem = ({ ecoPoints }) => {
  const currentBadge = getCurrentBadge(ecoPoints);
  const nextBadge = getNextBadge(ecoPoints);
  const progressPercentage = getProgressPercentage(ecoPoints);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        🌟 Achievement Badges
      </h3>
      
      {/* Current Badge */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">{currentBadge.name}</div>
        <h4 className="text-lg font-semibold text-gray-900 mb-1">
          {currentBadge.description}
        </h4>
        <p className="text-sm text-gray-600">
          {ecoPoints} / {nextBadge.requirement} points
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress to next badge</span>
          <span>{progressPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-eco-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Next: {nextBadge.name} at {nextBadge.requirement} points
        </p>
      </div>

      {/* All Badges */}
      <div className="space-y-3">
        <h5 className="font-medium text-gray-900">All Badges:</h5>
        {badges.map((badge) => {
          const isUnlocked = ecoPoints >= badge.requirement;
          const isCurrent = badge.id === currentBadge.id;
          
          return (
            <div
              key={badge.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border ${
                isCurrent
                  ? 'bg-eco-green-50 border-eco-green-200'
                  : isUnlocked
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-gray-100 border-gray-300 opacity-50'
              }`}
            >
              <div className="text-2xl">{badge.name}</div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {badge.description}
                </div>
                <div className="text-sm text-gray-600">
                  Requires {badge.requirement} points
                </div>
              </div>
              <div className="text-sm">
                {isUnlocked ? (
                  <span className="text-eco-green-600 font-semibold">✓ Unlocked</span>
                ) : (
                  <span className="text-gray-500">🔒 Locked</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeSystem; 