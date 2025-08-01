import React, { useState } from 'react';

const HardwareDemo = () => {
  const [selectedWasteType, setSelectedWasteType] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const wasteTypes = [
    { type: 'plastic', name: 'Plastic', icon: '🥤', color: '#3B82F6' },
    { type: 'metal', name: 'Metal', icon: '🥫', color: '#F59E0B' },
    { type: 'organic', name: 'Organic', icon: '🍎', color: '#10B981' },
    { type: 'e-waste', name: 'E-Waste', icon: '📱', color: '#EF4444' },
    { type: 'glass', name: 'Glass', icon: '🍾', color: '#8B5CF6' },
    { type: 'paper', name: 'Paper', icon: '📄', color: '#6B7280' }
  ];

  const handleWasteDrop = (wasteType) => {
    setSelectedWasteType(wasteType);
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 2000);
  };

  const resetDemo = () => {
    setSelectedWasteType(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ⚙️ Smart Bin Hardware Demo
        </h1>
        <p className="text-lg text-gray-600">
          Experience the future of waste sorting with AI-powered smart bins
        </p>
      </div>

      {/* Smart Bin Visualization */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          🤖 Smart Bin Prototype
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Bin Visualization */}
          <div className="text-center">
            <div className="relative inline-block">
              {/* Main Bin */}
              <div className="w-48 h-64 bg-gray-300 rounded-lg border-4 border-gray-400 relative">
                {/* Camera */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                
                {/* Display Screen */}
                <div className="absolute top-16 left-4 right-4 h-16 bg-black rounded-lg flex items-center justify-center">
                  {isProcessing ? (
                    <div className="text-green-400 text-sm">
                      <div className="animate-spin inline-block w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full mr-2"></div>
                      Analyzing...
                    </div>
                  ) : selectedWasteType ? (
                    <div className="text-green-400 text-sm">
                      <div className="text-2xl mb-1">{selectedWasteType.icon}</div>
                      {selectedWasteType.name}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">
                      Ready to scan
                    </div>
                  )}
                </div>
                
                {/* Speaker */}
                <div className="absolute top-36 left-4 right-4 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                </div>
                
                {/* Compartments */}
                <div className="absolute bottom-4 left-2 right-2 grid grid-cols-3 gap-1 h-20">
                  {wasteTypes.map((type, index) => (
                    <div
                      key={type.type}
                      className={`border-2 rounded ${
                        selectedWasteType?.type === type.type && showResult
                          ? 'border-green-500 bg-green-100'
                          : 'border-gray-400 bg-gray-200'
                      }`}
                    >
                      <div className="text-center text-xs p-1">
                        {type.icon}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Drop Zone */}
              <div className="mt-4 text-center">
                <div className="text-sm text-gray-600 mb-2">Drop waste here</div>
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg mx-auto flex items-center justify-center">
                  <div className="text-gray-400">📦</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Test Waste Types
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {wasteTypes.map((wasteType) => (
                  <button
                    key={wasteType.type}
                    onClick={() => handleWasteDrop(wasteType)}
                    disabled={isProcessing}
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <div className="text-2xl mb-1">{wasteType.icon}</div>
                    <div className="text-sm font-medium">{wasteType.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Hardware Features
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium">AI Camera</div>
                    <div className="text-sm text-gray-600">High-resolution waste recognition</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium">Voice Speaker</div>
                    <div className="text-sm text-gray-600">Audio disposal instructions</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-sm">📱</div>
                  </div>
                  <div>
                    <div className="font-medium">Smart Display</div>
                    <div className="text-sm text-gray-600">Real-time classification results</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="text-white text-sm">⚡</div>
                  </div>
                  <div>
                    <div className="font-medium">Auto-Sorting</div>
                    <div className="text-sm text-gray-600">Mechanical compartment routing</div>
                  </div>
                </div>
              </div>
            </div>

            {showResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">
                  ✅ Classification Complete
                </h4>
                <p className="text-green-800 text-sm mb-3">
                  The smart bin has successfully identified and sorted the waste item.
                </p>
                <button
                  onClick={resetDemo}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Reset Demo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          🔧 Technical Specifications
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '🤖',
              title: 'AI Processing',
              specs: [
                'TensorFlow Lite model',
                'Real-time classification',
                '95%+ accuracy rate',
                'Offline processing capability'
              ]
            },
            {
              icon: '📷',
              title: 'Camera System',
              specs: [
                '8MP HD camera',
                'Infrared night vision',
                'Wide-angle lens',
                'Auto-focus capability'
              ]
            },
            {
              icon: '🔊',
              title: 'Audio System',
              specs: [
                'High-quality speaker',
                'Multi-language support',
                'Adjustable volume',
                'Voice feedback system'
              ]
            },
            {
              icon: '📱',
              title: 'Display Interface',
              specs: [
                '7" touchscreen display',
                'HD resolution',
                'Touch controls',
                'Status indicators'
              ]
            },
            {
              icon: '⚙️',
              title: 'Mechanical System',
              specs: [
                '6 sorting compartments',
                'Motorized routing',
                'Smooth operation',
                'Low maintenance'
              ]
            },
            {
              icon: '🔋',
              title: 'Power & Connectivity',
              specs: [
                'Solar panel option',
                'WiFi connectivity',
                'Battery backup',
                'Low power consumption'
              ]
            }
          ].map((spec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">{spec.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {spec.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {spec.specs.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-600 flex items-start">
                    <span className="text-eco-green-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Future Roadmap */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          🚀 Future Development Roadmap
        </h2>
        <div className="space-y-6">
          {[
            {
              phase: 'Phase 1',
              title: 'Prototype Development',
              timeline: 'Q1 2024',
              features: [
                'Basic AI classification',
                'Single compartment sorting',
                'Mobile app integration',
                'Data collection system'
              ],
              status: 'completed'
            },
            {
              phase: 'Phase 2',
              title: 'Multi-Compartment System',
              timeline: 'Q2 2024',
              features: [
                '6-compartment sorting',
                'Voice instructions',
                'Real-time analytics',
                'Cloud data sync'
              ],
              status: 'in-progress'
            },
            {
              phase: 'Phase 3',
              title: 'Smart City Integration',
              timeline: 'Q3 2024',
              features: [
                'IoT connectivity',
                'Fleet management',
                'Predictive maintenance',
                'Municipal integration'
              ],
              status: 'planned'
            },
            {
              phase: 'Phase 4',
              title: 'Advanced AI Features',
              timeline: 'Q4 2024',
              features: [
                'Multi-language support',
                'Advanced analytics',
                'Machine learning improvements',
                'Global deployment'
              ],
              status: 'planned'
            }
          ].map((phase, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {phase.phase}: {phase.title}
                  </h3>
                  <p className="text-sm text-gray-600">{phase.timeline}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                  phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {phase.status === 'completed' ? '✅ Completed' :
                   phase.status === 'in-progress' ? '🔄 In Progress' :
                   '📋 Planned'}
                </div>
              </div>
              <ul className="space-y-2">
                {phase.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-gray-600 flex items-start">
                    <span className="text-eco-green-500 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Join the Smart Waste Revolution
        </h2>
        <p className="text-xl mb-6 opacity-90">
          Be part of the future of sustainable waste management
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/sort"
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
          >
            🚀 Try Smart Sorting
          </a>
          <a
            href="/awareness"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
          >
            🌍 Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default HardwareDemo; 