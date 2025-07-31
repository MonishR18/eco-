import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RotateCcw, CheckCircle, XCircle, Info, Brain, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTracker } from '../context/TrackerContext';
import CameraCapture from '../components/WasteSorter/CameraCapture';
import wasteDetectionService from '../services/wasteDetectionService';
import TipsPopup from '../components/WasteSorter/TipsPopup';

const SortWaste = () => {
  const { addCredits, addExperience, unlockBadge } = useUser();
  const { addWasteItem } = useTracker();
  const [currentItem, setCurrentItem] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [detectionError, setDetectionError] = useState(null);

  // Handle camera capture
  const handleImageCapture = async (captureData) => {
    setCapturedImage(captureData);
    setIsScanning(true);
    setShowResult(false);
    setSelectedCategory(null);
    setDetectionError(null);
    setCameraActive(false);
    
    try {
      // Classify the captured image
      const result = await wasteDetectionService.classifyImage(captureData.blob);
      setDetectionResult(result);
      
      // Create a waste item object
      const categoryInfo = wasteDetectionService.getCategoryInfo(result.category);
      const wasteItem = {
        name: `Detected ${categoryInfo.name} Item`,
        category: result.category,
        image: captureData.imageUrl,
        description: categoryInfo.description,
        disposalTip: categoryInfo.disposalTip,
        ecoScore: categoryInfo.ecoScore,
        recyclable: result.category !== 'e-waste',
        sector: 'household',
        confidence: result.confidence
      };
      
      setCurrentItem(wasteItem);
      setIsScanning(false);
      setShowResult(true);
      setScanCount(prev => prev + 1);
    } catch (error) {
      console.error('Detection error:', error);
      setDetectionError('Failed to analyze the image. Please try again.');
      setIsScanning(false);
    }
  };

  const handleCameraError = (error) => {
    setDetectionError(`Camera error: ${error}`);
  };

  const startCamera = () => {
    setCameraActive(true);
    setDetectionError(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const correct = category === currentItem.category;
    setIsCorrect(correct);

    if (correct) {
      // Add credits and experience
      addCredits(5);
      addExperience(10);
      
      // Add to tracker
      addWasteItem({
        name: currentItem.name,
        category: currentItem.category,
        sector: currentItem.sector,
        ecoScore: currentItem.ecoScore,
        recyclable: currentItem.recyclable
      });

      // Check for badges
      if (scanCount === 0) {
        unlockBadge({ id: 1, name: 'Eco Warrior', icon: '🌱' });
      }
    }
  };

  const resetScan = () => {
    setCurrentItem(null);
    setShowResult(false);
    setSelectedCategory(null);
    setIsCorrect(false);
    setCapturedImage(null);
    setDetectionResult(null);
    setDetectionError(null);
  };

  const categories = [
    { key: 'plastic', name: 'Plastic', icon: '🔄', color: '#3b82f6' },
    { key: 'organic', name: 'Organic', icon: '🍃', color: '#22c55e' },
    { key: 'paper', name: 'Paper', icon: '📄', color: '#f59e0b' },
    { key: 'metal', name: 'Metal', icon: '🔩', color: '#6b7280' },
    { key: 'glass', name: 'Glass', icon: '🥃', color: '#8b5cf6' },
    { key: 'e-waste', name: 'E-Waste', icon: '💻', color: '#ef4444' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green-50 to-eco-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Smart Waste Sorter</h1>
          <p className="text-xl text-gray-600">
            Point your camera at waste items to identify and sort them correctly
          </p>
        </motion.div>

        {/* Camera Area */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Error Display */}
          {detectionError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">Error:</span>
                <span>{detectionError}</span>
              </div>
            </motion.div>
          )}

          {/* Camera Capture */}
          {cameraActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Point Camera at Waste Item
                </h3>
                <p className="text-gray-600">
                  Position the item within the frame and tap the camera button to capture
                </p>
              </div>
              <CameraCapture
                onCapture={handleImageCapture}
                onError={handleCameraError}
                isActive={cameraActive}
              />
            </motion.div>
          )}

          {/* Ready to Scan */}
          {!currentItem && !isScanning && !cameraActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Ready to Scan
              </h3>
              <p className="text-gray-600 mb-8">
                Use your device's camera to capture and identify waste items
              </p>
              <button
                onClick={startCamera}
                className="bg-eco-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-eco-green-600 transition-colors duration-300 flex items-center gap-2 mx-auto"
              >
                <Camera className="w-5 h-5" />
                Open Camera
              </button>
            </motion.div>
          )}

          {/* Scanning Animation */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-32 h-32 bg-eco-green-100 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                <Brain className="w-16 h-16 text-eco-green-600 animate-bounce" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Analyzing...
              </h3>
              <p className="text-gray-600">
                Using AI to identify waste type...
              </p>
            </motion.div>
          )}

          {/* Result Display */}
          <AnimatePresence>
            {showResult && currentItem && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Item Display */}
                <div className="text-center">
                  <div className="w-48 h-48 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={currentItem.image}
                      alt={currentItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {currentItem.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {currentItem.description}
                  </p>
                  {detectionResult && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-center gap-2 text-blue-800">
                        <Brain className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          AI Confidence: {Math.round(detectionResult.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Category Selection */}
                {!selectedCategory && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                      What type of waste is this?
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {categories.map((category) => (
                        <motion.button
                          key={category.key}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCategorySelect(category.key)}
                          className="p-4 border-2 border-gray-200 rounded-xl hover:border-eco-green-300 hover:bg-eco-green-50 transition-colors duration-300 text-center"
                        >
                          <div className="text-3xl mb-2">{category.icon}</div>
                          <div className="font-semibold text-gray-800">{category.name}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Result Display */}
                {selectedCategory && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className={`text-6xl mb-4 ${isCorrect ? 'text-eco-green-500' : 'text-red-500'}`}>
                      {isCorrect ? <CheckCircle /> : <XCircle />}
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-eco-green-600' : 'text-red-600'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      This is {wasteDetectionService.getCategoryInfo(currentItem.category).name} waste
                    </p>
                    
                    {/* Disposal Tip */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-5 h-5 text-eco-green-600" />
                        <span className="font-semibold text-gray-800">Disposal Tip:</span>
                      </div>
                      <p className="text-gray-700">{currentItem.disposalTip}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => setShowTips(true)}
                        className="bg-eco-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-eco-blue-600 transition-colors duration-300"
                      >
                        Learn More
                      </button>
                      <button
                        onClick={resetScan}
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300 flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Scan Another
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tips Popup */}
        {showTips && currentItem && (
          <TipsPopup
            item={currentItem}
            category={wasteDetectionService.getCategoryInfo(currentItem.category)}
            onClose={() => setShowTips(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SortWaste; 