import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Recycle, Leaf, AlertTriangle } from 'lucide-react';

const TipsPopup = ({ item, category, onClose }) => {
  const getCategoryInfo = () => {
    const info = {
      plastic: {
        icon: <Recycle className="w-8 h-8" />,
        color: "text-eco-blue-600",
        bgColor: "bg-eco-blue-50",
        tips: [
          "Check the recycling number on the bottom",
          "Rinse containers before recycling",
          "Remove caps and labels when possible",
          "Consider reusable alternatives"
        ]
      },
      organic: {
        icon: <Leaf className="w-8 h-8" />,
        color: "text-eco-green-600",
        bgColor: "bg-eco-green-50",
        tips: [
          "Compost at home or use municipal composting",
          "Avoid putting meat or dairy in home compost",
          "Great for creating nutrient-rich soil",
          "Reduces methane emissions from landfills"
        ]
      },
      'e-waste': {
        icon: <AlertTriangle className="w-8 h-8" />,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        tips: [
          "Never throw in regular trash",
          "Take to certified e-waste recycling centers",
          "Donate if still functional",
          "Contains valuable and harmful materials"
        ]
      },
      paper: {
        icon: <Recycle className="w-8 h-8" />,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        tips: [
          "Flatten cardboard to save space",
          "Remove tape and labels when possible",
          "Keep paper dry and clean",
          "Paper can be recycled 5-7 times"
        ]
      },
      glass: {
        icon: <Recycle className="w-8 h-8" />,
        color: "text-cyan-600",
        bgColor: "bg-cyan-50",
        tips: [
          "Rinse thoroughly before recycling",
          "Glass is infinitely recyclable",
          "Separate by color if required",
          "Don't break glass before recycling"
        ]
      },
      metal: {
        icon: <Recycle className="w-8 h-8" />,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        tips: [
          "Rinse and crush to save space",
          "Aluminum is highly valuable for recycling",
          "Check for local metal recycling programs",
          "Metals can be recycled indefinitely"
        ]
      }
    };
    return info[item.category] || info.plastic;
  };

  const categoryInfo = getCategoryInfo();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${categoryInfo.bgColor}`}>
                  <div className={categoryInfo.color}>
                    {categoryInfo.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">{category.name} Waste</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Item Details */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-eco-green-600" />
                Item Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Category:</span>
                  <span className="ml-2 font-medium">{category.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Sector:</span>
                  <span className="ml-2 font-medium capitalize">{item.sector}</span>
                </div>
                <div>
                  <span className="text-gray-600">Recyclable:</span>
                  <span className={`ml-2 font-medium ${item.recyclable ? 'text-eco-green-600' : 'text-red-600'}`}>
                    {item.recyclable ? 'Yes' : 'No'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Eco Score:</span>
                  <span className="ml-2 font-medium">{item.ecoScore}/10</span>
                </div>
              </div>
            </div>

            {/* Disposal Tip */}
            <div className="bg-eco-green-50 rounded-xl p-4 border border-eco-green-200">
              <h3 className="font-semibold text-eco-green-800 mb-2">Disposal Tip</h3>
              <p className="text-eco-green-700">{item.disposalTip}</p>
            </div>

            {/* Category Tips */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-eco-blue-600" />
                {category.name} Waste Tips
              </h3>
              <div className="space-y-2">
                {categoryInfo.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-eco-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-gradient-to-r from-eco-green-50 to-eco-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Environmental Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-2xl font-bold text-eco-green-600">{item.ecoScore}</div>
                  <div className="text-sm text-gray-600">Eco Score</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-2xl font-bold text-eco-blue-600">
                    {item.recyclable ? 'High' : 'Low'}
                  </div>
                  <div className="text-sm text-gray-600">Recyclability</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-600">
                    {item.category === 'organic' ? 'Positive' : 'Neutral'}
                  </div>
                  <div className="text-sm text-gray-600">Impact</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-eco-green-500 text-white py-3 rounded-lg font-semibold hover:bg-eco-green-600 transition-colors duration-300"
            >
              Got it!
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TipsPopup; 