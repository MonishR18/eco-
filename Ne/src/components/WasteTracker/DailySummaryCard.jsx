import React from 'react';

const DailySummaryCard = ({ 
  date = new Date(), 
  summary = {}, 
  showDetails = false 
}) => {
  // Default summary data if none provided
  const defaultSummary = {
    totalItems: 12,
    totalPoints: 85,
    categories: {
      'Plastic': 4,
      'Paper': 3,
      'Glass': 2,
      'Metal': 2,
      'Organic': 1
    },
    streak: 7,
    goalProgress: 80,
    dailyGoal: 15,
    achievements: [
      { id: 1, title: 'Perfect Day', description: 'Sorted all waste types', icon: '🌟' },
      { id: 2, title: 'Streak Master', description: '7-day streak maintained', icon: '🔥' }
    ]
  };

  const dailySummary = Object.keys(summary).length > 0 ? summary : defaultSummary;
  const formattedDate = date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const getCategoryIcon = (category) => {
    const icons = {
      'Plastic': '🥤',
      'Paper': '📦',
      'Glass': '🍾',
      'Metal': '🥫',
      'Organic': '🍎',
      'Electronic': '💻'
    };
    return icons[category] || '♻️';
  };

  const getGoalColor = (progress) => {
    if (progress >= 100) return 'text-green-600';
    if (progress >= 75) return 'text-yellow-600';
    if (progress >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Daily Summary</h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            {dailySummary.totalPoints}
          </div>
          <div className="text-xs text-gray-500">Points Earned</div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">
            {dailySummary.totalItems}
          </div>
          <div className="text-xs text-gray-500">Items Sorted</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-600">
            {Object.keys(dailySummary.categories).length}
          </div>
          <div className="text-xs text-gray-500">Categories</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-orange-600">
            {dailySummary.streak}
          </div>
          <div className="text-xs text-gray-500">Day Streak</div>
        </div>
      </div>

      {/* Daily Goal Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Daily Goal</span>
          <span className={`text-sm font-medium ${getGoalColor(dailySummary.goalProgress)}`}>
            {Math.min(dailySummary.totalItems, dailySummary.dailyGoal)} / {dailySummary.dailyGoal}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              dailySummary.goalProgress >= 100 ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${Math.min(dailySummary.goalProgress, 100)}%` }}
          ></div>
        </div>
        {dailySummary.goalProgress >= 100 && (
          <p className="text-xs text-green-600 mt-1">🎉 Daily goal achieved!</p>
        )}
      </div>

      {/* Category Breakdown */}
      {showDetails && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Category Breakdown</h4>
          <div className="space-y-2">
            {Object.entries(dailySummary.categories).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getCategoryIcon(category)}</span>
                  <span className="text-sm text-gray-700">{category}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{count} items</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {dailySummary.achievements && dailySummary.achievements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Today's Achievements</h4>
          <div className="space-y-2">
            {dailySummary.achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                <span className="text-lg">{achievement.icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-900">{achievement.title}</div>
                  <div className="text-xs text-gray-600">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Environmental Impact */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Environmental Impact</h4>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">
              {Math.round(dailySummary.totalItems * 0.5)}kg
            </div>
            <div className="text-xs text-gray-500">CO₂ Saved</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {Math.round(dailySummary.totalItems * 0.3)}L
            </div>
            <div className="text-xs text-gray-500">Water Saved</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-3">
        <button className="flex-1 btn btn-outline text-sm">
          View Details
        </button>
        <button className="flex-1 btn btn-primary text-sm">
          Share Progress
        </button>
      </div>
    </div>
  );
};

export default DailySummaryCard;
