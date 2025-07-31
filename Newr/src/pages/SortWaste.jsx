import React, { useState, useRef } from 'react';
import { useTracker } from '../context/TrackerContext';

const SortWaste = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [detectedItem, setDetectedItem] = useState(null);
  const [manualInput, setManualInput] = useState({
    type: '',
    amount: 1,
    description: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addWasteEntry } = useTracker();

  const wasteTypes = [
    { id: 'recyclable', name: 'Recyclable', icon: '♻️', color: 'bg-blue-500', examples: 'Plastic bottles, paper, glass, metal cans' },
    { id: 'organic', name: 'Organic', icon: '🍃', color: 'bg-green-500', examples: 'Food waste, garden waste, compostable items' },
    { id: 'general', name: 'General Waste', icon: '🗑️', color: 'bg-gray-500', examples: 'Non-recyclable items, mixed materials' },
    { id: 'hazardous', name: 'Hazardous', icon: '⚠️', color: 'bg-red-500', examples: 'Batteries, chemicals, electronics' }
  ];

  const mockItems = [
    { name: 'Plastic Water Bottle', type: 'recyclable', confidence: 0.95 },
    { name: 'Apple Core', type: 'organic', confidence: 0.92 },
    { name: 'Paper Coffee Cup', type: 'recyclable', confidence: 0.88 },
    { name: 'Banana Peel', type: 'organic', confidence: 0.96 },
    { name: 'Aluminum Can', type: 'recyclable', confidence: 0.94 },
    { name: 'Used Tissue', type: 'general', confidence: 0.87 },
    { name: 'Battery', type: 'hazardous', confidence: 0.91 },
    { name: 'Glass Bottle', type: 'recyclable', confidence: 0.93 }
  ];

  const startCamera = () => {
    setIsCameraActive(true);
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const randomItem = mockItems[Math.floor(Math.random() * mockItems.length)];
      setDetectedItem(randomItem);
      setIsProcessing(false);
    }, 2000);
  };

  const stopCamera = () => {
    setIsCameraActive(false);
    setDetectedItem(null);
  };

  const confirmDetection = () => {
    if (detectedItem) {
      addWasteEntry(detectedItem.type, manualInput.amount, detectedItem.name);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        stopCamera();
        setManualInput({ type: '', amount: 1, description: '' });
      }, 2000);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualInput.type && manualInput.amount > 0) {
      addWasteEntry(manualInput.type, manualInput.amount, manualInput.description);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setManualInput({ type: '', amount: 1, description: '' });
      }, 2000);
    }
  };

  const getWasteTypeInfo = (typeId) => {
    return wasteTypes.find(type => type.id === typeId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Waste Sorting</h1>
          <p className="text-gray-600">
            Use AI-powered camera detection or manually input your waste items
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <span>✅</span>
              <span>Waste item added successfully!</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Camera Detection</h2>
            
            {!isCameraActive ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📷</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Point your camera at a waste item to automatically detect its type
                </p>
                <button
                  onClick={startCamera}
                  className="btn btn-primary"
                >
                  Start Camera
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Camera View */}
                <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isProcessing ? (
                      <div className="text-center text-white">
                        <div className="spinner w-12 h-12 mx-auto mb-4"></div>
                        <p>Analyzing waste item...</p>
                      </div>
                    ) : (
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">📱</div>
                        <p>Camera Active</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Detection Overlay */}
                  {detectedItem && (
                    <div className="absolute top-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${getWasteTypeInfo(detectedItem.type)?.color} rounded-lg flex items-center justify-center`}>
                          <span className="text-white text-xl">{getWasteTypeInfo(detectedItem.type)?.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{detectedItem.name}</h3>
                          <p className="text-sm text-gray-600 capitalize">{detectedItem.type}</p>
                          <p className="text-xs text-green-600">Confidence: {Math.round(detectedItem.confidence * 100)}%</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex space-x-3">
                  <button
                    onClick={stopCamera}
                    className="btn btn-secondary flex-1"
                  >
                    Stop Camera
                  </button>
                  {detectedItem && (
                    <button
                      onClick={confirmDetection}
                      className="btn btn-primary flex-1"
                    >
                      Confirm & Add
                    </button>
                  )}
                </div>

                {/* Amount Input */}
                {detectedItem && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={manualInput.amount}
                      onChange={(e) => setManualInput({ ...manualInput, amount: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Manual Input Section */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Manual Input</h2>
            
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waste Type
                </label>
                <select
                  value={manualInput.type}
                  onChange={(e) => setManualInput({ ...manualInput, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select waste type</option>
                  {wasteTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  min="1"
                  value={manualInput.amount}
                  onChange={(e) => setManualInput({ ...manualInput, amount: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={manualInput.description}
                  onChange={(e) => setManualInput({ ...manualInput, description: e.target.value })}
                  placeholder="e.g., Plastic bottle, paper, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary"
              >
                Add Waste Item
              </button>
            </form>
          </div>
        </div>

        {/* Waste Type Guide */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Waste Type Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wasteTypes.map((type) => (
              <div key={type.id} className="card">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-lg">{type.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{type.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{type.examples}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 card bg-blue-50 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Tips for Better Sorting</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Clean recyclable items before disposing</li>
            <li>• Check local recycling guidelines for specific items</li>
            <li>• Separate different types of recyclables</li>
            <li>• Use the camera feature for quick identification</li>
            <li>• When in doubt, use the manual input option</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SortWaste;
