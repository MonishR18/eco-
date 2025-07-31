import React from 'react';

const TrackerLog = ({ entries = [], title = 'Recent Activity' }) => {
  // Default mock data if no entries provided
  const defaultEntries = [
    {
      id: 1,
      type: 'Plastic',
      amount: 2,
      description: 'Water bottles and food containers',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      points: 10,
      icon: '🥤'
    },
    {
      id: 2,
      type: 'Paper',
      amount: 5,
      description: 'Cardboard boxes and newspapers',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      points: 15,
      icon: '📦'
    },
    {
      id: 3,
      type: 'Glass',
      amount: 3,
      description: 'Glass bottles and jars',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      points: 12,
      icon: '🍾'
    },
    {
      id: 4,
      type: 'Organic',
      amount: 1,
      description: 'Food scraps and coffee grounds',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      points: 8,
      icon: '🍎'
    }
  ];

  const logEntries = entries.length > 0 ? entries : defaultEntries;

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'Plastic': 'bg-blue-100 text-blue-800',
      'Paper': 'bg-yellow-100 text-yellow-800',
      'Glass': 'bg-purple-100 text-purple-800',
      'Metal': 'bg-gray-100 text-gray-800',
      'Organic': 'bg-green-100 text-green-800',
      'Electronic': 'bg-red-100 text-red-800'
    };
    return colors[type] || colors['Plastic'];
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">{logEntries.length} entries</span>
      </div>

      <div className="space-y-4">
        {logEntries.map((entry, index) => (
          <div key={entry.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
              {entry.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-900">{entry.type}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(entry.type)}`}>
                    {entry.amount} item{entry.amount !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-green-600">+{entry.points} pts</span>
                  <span className="text-xs text-gray-500">{formatTimestamp(entry.timestamp)}</span>
                </div>
              </div>
              
              {entry.description && (
                <p className="text-sm text-gray-600">{entry.description}</p>
              )}
            </div>

            {/* Timeline connector */}
            {index < logEntries.length - 1 && (
              <div className="absolute left-5 top-12 w-0.5 h-8 bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {logEntries.reduce((sum, entry) => sum + entry.amount, 0)}
            </div>
            <div className="text-xs text-gray-500">Total Items</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {logEntries.reduce((sum, entry) => sum + entry.points, 0)}
            </div>
            <div className="text-xs text-gray-500">Points Earned</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {new Set(logEntries.map(entry => entry.type)).size}
            </div>
            <div className="text-xs text-gray-500">Categories</div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {logEntries.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📝</div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h4>
          <p className="text-gray-500 mb-4">Start sorting waste to see your activity log here</p>
          <button className="btn btn-primary">Sort Your First Waste</button>
        </div>
      )}
    </div>
  );
};

export default TrackerLog;
