import React, { useState } from 'react';
import { getDisposalRule } from '../data/disposalRules';
import { getPointsForWasteType } from '../data/badges';

const ResultCard = ({ result, onClose, onConfirm }) => {
  const [showDetails, setShowDetails] = useState(false);
  const disposalRule = getDisposalRule(result.type);
  const pointsEarned = getPointsForWasteType(result.type);

  const confidenceColor = result.confidence > 0.8 ? 'text-green-600' : 
                         result.confidence > 0.6 ? 'text-yellow-600' : 'text-red-600';

  const confidenceText = result.confidence > 0.8 ? 'High' : 
                        result.confidence > 0.6 ? 'Medium' : 'Low';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Waste Analysis Result</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Classification Result */}
          <div className="text-center">
            <div className="text-6xl mb-4">{disposalRule.icon}</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {disposalRule.name}
            </h3>
            <div className="inline-flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-gray-700">
                {disposalRule.category}
              </span>
            </div>
          </div>

          {/* Confidence Level */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Confidence Level:</span>
              <span className={`text-sm font-semibold ${confidenceColor}`}>
                {confidenceText} ({(result.confidence * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-eco-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${result.confidence * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Points Earned */}
          <div className="bg-eco-green-50 border border-eco-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🌟</span>
              <span className="text-lg font-semibold text-eco-green-700">
                +{pointsEarned} Eco Points Earned!
              </span>
            </div>
          </div>

          {/* Disposal Instructions */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Disposal Instructions</h4>
            <div className="space-y-2">
              {disposalRule.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-eco-green-500 font-bold">{index + 1}.</span>
                  <span className="text-gray-700">{instruction}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">💡 Pro Tips</h4>
            <ul className="space-y-1">
              {disposalRule.tips.map((tip, index) => (
                <li key={index} className="text-sm text-blue-800">• {tip}</li>
              ))}
            </ul>
          </div>

          {/* Eco Fact */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-yellow-900 mb-2">🌍 Did You Know?</h4>
            <p className="text-sm text-yellow-800">{disposalRule.ecoFact}</p>
          </div>

          {/* Alternatives */}
          {result.alternatives && result.alternatives.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Alternative Classifications</h4>
              <div className="space-y-2">
                {result.alternatives.map((alt, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      {getDisposalRule(alt.type).icon} {getDisposalRule(alt.type).name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {(alt.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onConfirm}
              className="flex-1 btn-primary"
            >
              ✅ Confirm Classification
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard; 