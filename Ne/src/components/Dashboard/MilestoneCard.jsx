import React from 'react';

const MilestoneCard = ({ milestone, isCompleted = false, progress = 0 }) => {
  const {
    id,
    title,
    description,
    icon,
    target,
    current,
    reward,
    category
  } = milestone;

  const progressPercentage = Math.min((current / target) * 100, 100);
  const isUnlocked = isCompleted || progressPercentage >= 100;

  const getCategoryColor = (category) => {
    const colors = {
      points: 'bg-blue-100 text-blue-800',
      streak: 'bg-orange-100 text-orange-800',
      waste: 'bg-green-100 text-green-800',
      social: 'bg-purple-100 text-purple-800',
      learning: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || colors.points;
  };

  return (
    <div className={`card transition-all duration-300 ${
      isUnlocked 
        ? 'ring-2 ring-green-500 bg-green-50' 
        : 'hover:shadow-md'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
            isUnlocked ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
          }`}>
            {icon}
          </div>
          <div>
            <h3 className={`font-semibold ${
              isUnlocked ? 'text-green-800' : 'text-gray-900'
            }`}>
              {title}
            </h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        
        {isUnlocked && (
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500 text-lg">🏆</span>
            <span className="text-sm font-medium text-green-800">
              +{reward} pts
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">
            {current} / {target}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              isUnlocked ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Category Badge */}
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(category)}`}>
          {category}
        </span>
        
        {isUnlocked && (
          <div className="flex items-center space-x-1">
            <span className="text-green-500">✓</span>
            <span className="text-sm text-green-700 font-medium">Completed</span>
          </div>
        )}
      </div>

      {/* Completion Animation */}
      {isUnlocked && (
        <div className="absolute inset-0 bg-green-500 bg-opacity-10 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
};

export default MilestoneCard;
