import React from 'react';

const ScoreChart = ({ 
  currentScore = 0, 
  maxScore = 100, 
  weeklyData = [], 
  title = 'Eco Score Progress' 
}) => {
  // Generate mock weekly data if none provided
  const defaultWeeklyData = [
    { week: 'Week 1', score: 15 },
    { week: 'Week 2', score: 28 },
    { week: 'Week 3', score: 42 },
    { week: 'Week 4', score: 35 },
    { week: 'Week 5', score: 58 },
    { week: 'Week 6', score: 67 },
    { week: 'Week 7', score: currentScore }
  ];

  const chartData = weeklyData.length > 0 ? weeklyData : defaultWeeklyData;
  const maxChartValue = Math.max(...chartData.map(d => d.score), maxScore);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLevel = (score) => {
    if (score >= 90) return { level: 'Eco Master', icon: '🌍' };
    if (score >= 80) return { level: 'Green Guardian', icon: '🌱' };
    if (score >= 60) return { level: 'Eco Enthusiast', icon: '♻️' };
    if (score >= 40) return { level: 'Getting Started', icon: '🌿' };
    return { level: 'Beginner', icon: '🌱' };
  };

  const scoreLevel = getScoreLevel(currentScore);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      {/* Current Score Display */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full border-8 border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(currentScore)}`}>
                {currentScore}
              </div>
              <div className="text-xs text-gray-500">/ {maxScore}</div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-500"
               style={{
                 transform: 'rotate(-90deg)',
                 background: `conic-gradient(from 0deg, #10B981 ${(currentScore / maxScore) * 360}deg, transparent 0deg)`
               }}>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <span className="text-xl">{scoreLevel.icon}</span>
            <h4 className="text-lg font-semibold text-gray-900">{scoreLevel.level}</h4>
          </div>
          <p className="text-sm text-gray-600">
            {currentScore >= maxScore ? 'Perfect score achieved!' : `${maxScore - currentScore} points to next level`}
          </p>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Weekly Progress</h4>
        
        <div className="relative h-32">
          {/* Chart Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400">
            {[0, 25, 50, 75, 100].map((value) => (
              <div key={value} className="flex items-center">
                <span className="w-8 text-right">{value}</span>
                <div className="flex-1 border-t border-gray-200 ml-2"></div>
              </div>
            ))}
          </div>

          {/* Chart Bars */}
          <div className="absolute inset-0 flex items-end justify-between px-8 pb-6">
            {chartData.map((data, index) => {
              const height = (data.score / maxChartValue) * 100;
              const isCurrentWeek = index === chartData.length - 1;
              
              return (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <div
                    className={`w-6 rounded-t transition-all duration-500 ${
                      isCurrentWeek ? 'bg-green-500' : 'bg-blue-400'
                    }`}
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-600 transform -rotate-45 origin-left">
                    {data.week}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart Legend */}
        <div className="flex justify-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <span className="text-gray-600">Previous Weeks</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Current Week</span>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Score Breakdown</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Waste Sorting</span>
            <span className="font-medium">+{Math.floor(currentScore * 0.4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Daily Habits</span>
            <span className="font-medium">+{Math.floor(currentScore * 0.3)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Learning</span>
            <span className="font-medium">+{Math.floor(currentScore * 0.2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Social Tasks</span>
            <span className="font-medium">+{Math.floor(currentScore * 0.1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;
