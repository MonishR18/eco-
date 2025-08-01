import React from 'react';
import { getDisposalRule } from '../data/disposalRules';

const WasteStatsChart = ({ stats }) => {
  const { total, byType, totalPoints } = stats;
  
  const wasteTypes = [
    { key: 'plastic', name: 'Plastic', icon: '🥤', color: '#3B82F6' },
    { key: 'metal', name: 'Metal', icon: '🥫', color: '#F59E0B' },
    { key: 'organic', name: 'Organic', icon: '🍎', color: '#10B981' },
    { key: 'e-waste', name: 'E-Waste', icon: '📱', color: '#EF4444' },
    { key: 'glass', name: 'Glass', icon: '🍾', color: '#8B5CF6' },
    { key: 'paper', name: 'Paper', icon: '📄', color: '#6B7280' }
  ];

  const getWasteTypeCount = (type) => byType[type] || 0;
  const getPercentage = (count) => total > 0 ? ((count / total) * 100).toFixed(1) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        📊 Waste Sorting Statistics
      </h3>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-eco-green-50 rounded-lg">
          <div className="text-2xl font-bold text-eco-green-600">{total}</div>
          <div className="text-sm text-gray-600">Items Sorted</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{totalPoints}</div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">
            {total > 0 ? (totalPoints / total).toFixed(1) : 0}
          </div>
          <div className="text-sm text-gray-600">Avg Points/Item</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {Object.keys(byType).length}
          </div>
          <div className="text-sm text-gray-600">Categories Used</div>
        </div>
      </div>

      {/* Waste Type Breakdown */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Waste Type Distribution</h4>
        
        {wasteTypes.map((wasteType) => {
          const count = getWasteTypeCount(wasteType.key);
          const percentage = getPercentage(count);
          const disposalRule = getDisposalRule(wasteType.key);
          
          return (
            <div key={wasteType.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{wasteType.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {wasteType.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {disposalRule.category}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600">{percentage}%</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: wasteType.color
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Environmental Impact */}
      {total > 0 && (
        <div className="mt-6 p-4 bg-eco-green-50 rounded-lg">
          <h4 className="font-semibold text-eco-green-900 mb-2">
            🌍 Environmental Impact
          </h4>
          <div className="text-sm text-eco-green-800 space-y-1">
            <div>• You've sorted {total} waste items correctly</div>
            <div>• Earned {totalPoints} eco points for sustainable practices</div>
            <div>• Helped reduce contamination in recycling streams</div>
            <div>• Contributed to better waste management education</div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {total === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📊</div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            No sorting data yet
          </h4>
          <p className="text-gray-600">
            Start sorting waste items to see your statistics and environmental impact!
          </p>
        </div>
      )}
    </div>
  );
};

export default WasteStatsChart; 