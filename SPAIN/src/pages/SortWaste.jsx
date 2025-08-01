import React, { useState } from 'react';
import CameraInput from '../components/CameraInput';
import ResultCard from '../components/ResultCard';
import { classifyWaste, classifyWasteFromText } from '../utils/classifierMock';
import { addEcoPoints, addSortingRecord } from '../utils/storage';
import { getPointsForWasteType } from '../data/badges';

const SortWaste = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleImageSelect = async (imageFile) => {
    setIsProcessing(true);
    try {
      const classificationResult = await classifyWaste(imageFile);
      setResult(classificationResult);
      setShowResult(true);
    } catch (error) {
      console.error('Classification error:', error);
      alert('Sorry, there was an error analyzing the image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextInput = async (description) => {
    setIsProcessing(true);
    try {
      const classificationResult = classifyWasteFromText(description);
      setResult(classificationResult);
      setShowResult(true);
    } catch (error) {
      console.error('Classification error:', error);
      alert('Sorry, there was an error analyzing the description. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmClassification = () => {
    if (result) {
      const pointsEarned = getPointsForWasteType(result.type);
      addEcoPoints(pointsEarned);
      
      // Add to sorting history
      addSortingRecord({
        wasteType: result.type,
        confidence: result.confidence,
        pointsEarned: pointsEarned,
        method: 'image' // or 'text'
      });
      
      setShowResult(false);
      setResult(null);
      
      // Show success message
      alert(`✅ Great job! You earned ${pointsEarned} eco points for properly classifying this ${result.type} item.`);
    }
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🗑️ Smart Waste Sorting
        </h1>
        <p className="text-lg text-gray-600">
          Upload an image or describe the waste item to get instant classification and disposal instructions.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <CameraInput
          onImageSelect={handleImageSelect}
          onTextInput={handleTextInput}
          isProcessing={isProcessing}
        />
      </div>

      {/* Quick Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Quick Tips for Better Results
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <ul className="space-y-1">
            <li>• Ensure good lighting for clear photos</li>
            <li>• Focus on the main waste item</li>
            <li>• Remove background clutter when possible</li>
          </ul>
          <ul className="space-y-1">
            <li>• Be specific in your descriptions</li>
            <li>• Include material type if known</li>
            <li>• Mention size for better accuracy</li>
          </ul>
        </div>
      </div>

      {/* Waste Categories Info */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🗂️ Supported Waste Categories
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🥤', name: 'Plastic', color: 'bg-blue-100 text-blue-800' },
            { icon: '🥫', name: 'Metal', color: 'bg-yellow-100 text-yellow-800' },
            { icon: '🍎', name: 'Organic', color: 'bg-green-100 text-green-800' },
            { icon: '📱', name: 'E-Waste', color: 'bg-red-100 text-red-800' },
            { icon: '🍾', name: 'Glass', color: 'bg-purple-100 text-purple-800' },
            { icon: '📄', name: 'Paper', color: 'bg-gray-100 text-gray-800' }
          ].map((category, index) => (
            <div key={index} className={`${category.color} px-3 py-2 rounded-lg text-center`}>
              <span className="text-lg mr-2">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Result Modal */}
      {showResult && result && (
        <ResultCard
          result={result}
          onClose={handleCloseResult}
          onConfirm={handleConfirmClassification}
        />
      )}
    </div>
  );
};

export default SortWaste; 