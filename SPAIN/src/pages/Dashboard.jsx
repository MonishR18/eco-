import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BadgeSystem from '../components/BadgeSystem';
import WasteStatsChart from '../components/WasteStatsChart';
import { getEcoPoints, getWasteStats, getSortingHistory, exportUserData, clearAllData } from '../utils/storage';

const Dashboard = () => {
  const [ecoPoints, setEcoPoints] = useState(0);
  const [stats, setStats] = useState({ total: 0, byType: {}, totalPoints: 0 });
  const [sortingHistory, setSortingHistory] = useState([]);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const points = getEcoPoints();
    const wasteStats = getWasteStats();
    const history = getSortingHistory();
    
    setEcoPoints(points);
    setStats(wasteStats);
    setSortingHistory(history);
  };

  const handleExportData = () => {
    const success = exportUserData();
    if (success) {
      alert('Data exported successfully!');
    } else {
      alert('Failed to export data. Please try again.');
    }
  };

  const handleClearData = () => {
    const success = clearAllData();
    if (success) {
      setEcoPoints(0);
      setStats({ total: 0, byType: {}, totalPoints: 0 });
      setSortingHistory([]);
      setShowConfirmClear(false);
      alert('All data cleared successfully.');
    } else {
      alert('Failed to clear data. Please try again.');
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          📊 Your Eco Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Track your environmental impact and achievements
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl mb-2">🌟</div>
          <div className="text-3xl font-bold text-eco-green-600">{ecoPoints}</div>
          <div className="text-gray-600">Total Eco Points</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl mb-2">🗑️</div>
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-gray-600">Items Sorted</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl mb-2">📈</div>
          <div className="text-3xl font-bold text-purple-600">
            {stats.total > 0 ? (ecoPoints / stats.total).toFixed(1) : 0}
          </div>
          <div className="text-gray-600">Avg Points/Item</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Statistics Chart */}
        <WasteStatsChart stats={stats} />

        {/* Badge System */}
        <BadgeSystem ecoPoints={ecoPoints} />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            📝 Recent Sorting Activity
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={handleExportData}
              className="bg-eco-green-500 hover:bg-eco-green-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200"
            >
              📤 Export Data
            </button>
            <button
              onClick={() => setShowConfirmClear(true)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200"
            >
              🗑️ Clear Data
            </button>
          </div>
        </div>

        {sortingHistory.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sortingHistory.slice(0, 10).map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {record.wasteType === 'plastic' && '🥤'}
                    {record.wasteType === 'metal' && '🥫'}
                    {record.wasteType === 'organic' && '🍎'}
                    {record.wasteType === 'e-waste' && '📱'}
                    {record.wasteType === 'glass' && '🍾'}
                    {record.wasteType === 'paper' && '📄'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 capitalize">
                      {record.wasteType}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(record.timestamp)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-eco-green-600">
                    +{record.pointsEarned} pts
                  </div>
                  <div className="text-sm text-gray-600">
                    {(record.confidence * 100).toFixed(1)}% confidence
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📝</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              No sorting history yet
            </h4>
            <p className="text-gray-600 mb-4">
              Start sorting waste items to see your activity here!
            </p>
            <Link
              to="/sort"
              className="btn-primary"
            >
              🚀 Start Sorting
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          ⚡ Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/sort"
            className="p-4 bg-eco-green-50 border border-eco-green-200 rounded-lg text-center hover:bg-eco-green-100 transition-colors duration-200"
          >
            <div className="text-2xl mb-2">📸</div>
            <div className="font-semibold text-eco-green-700">Sort New Item</div>
            <div className="text-sm text-eco-green-600">Classify waste</div>
          </Link>
          <Link
            to="/awareness"
            className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center hover:bg-blue-100 transition-colors duration-200"
          >
            <div className="text-2xl mb-2">🌍</div>
            <div className="font-semibold text-blue-700">Learn More</div>
            <div className="text-sm text-blue-600">Eco awareness</div>
          </Link>
          <Link
            to="/hardware"
            className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center hover:bg-purple-100 transition-colors duration-200"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-semibold text-purple-700">Hardware Demo</div>
            <div className="text-sm text-purple-600">Smart bins</div>
          </Link>
        </div>
      </div>

      {/* Clear Data Confirmation Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Clear All Data?
            </h3>
            <p className="text-gray-600 mb-6">
              This will permanently delete all your eco points, sorting history, and preferences. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleClearData}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Yes, Clear All
              </button>
              <button
                onClick={() => setShowConfirmClear(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 