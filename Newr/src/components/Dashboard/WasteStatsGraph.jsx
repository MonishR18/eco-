import React from 'react';

const WasteStatsGraph = ({ data = [], title = 'Waste Sorting Progress' }) => {
  // Default data if none provided
  const defaultData = [
    { type: 'Plastic', amount: 25, color: '#10B981' },
    { type: 'Paper', amount: 30, color: '#3B82F6' },
    { type: 'Glass', amount: 15, color: '#8B5CF6' },
    { type: 'Metal', amount: 20, color: '#F59E0B' },
    { type: 'Organic', amount: 35, color: '#84CC16' }
  ];

  const chartData = data.length > 0 ? data : defaultData;
  const total = chartData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="space-y-4">
        {/* Bar Chart */}
        <div className="space-y-3">
          {chartData.map((item, index) => {
            const percentage = total > 0 ? (item.amount / total) * 100 : 0;
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700">{item.type}</span>
                  <span className="text-gray-500">{item.amount} items</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{total}</div>
            <div className="text-sm text-gray-500">Total Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {chartData.length}
            </div>
            <div className="text-sm text-gray-500">Categories</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 pt-2">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs text-gray-600">{item.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WasteStatsGraph;
