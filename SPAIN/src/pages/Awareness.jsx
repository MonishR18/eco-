import React, { useState, useEffect } from 'react';
import { ecoFacts, dailyTips, sustainabilityNews } from '../data/facts';

const Awareness = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    // Rotate facts every 10 seconds
    const factInterval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % ecoFacts.length);
    }, 10000);

    // Rotate tips every 15 seconds
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % dailyTips.length);
    }, 15000);

    return () => {
      clearInterval(factInterval);
      clearInterval(tipInterval);
    };
  }, []);

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🌍 Environmental Awareness
        </h1>
        <p className="text-lg text-gray-600">
          Learn about sustainability, waste management, and how to make a positive impact
        </p>
      </div>

      {/* Rotating Eco Fact Banner */}
      <div className="bg-gradient-to-r from-eco-green-500 to-eco-green-600 rounded-xl p-6 text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">💡</div>
          <h2 className="text-2xl font-bold mb-2">Did You Know?</h2>
          <p className="text-lg opacity-90">
            {ecoFacts[currentFactIndex].fact}
          </p>
          <div className="mt-4 text-sm opacity-75">
            Fact {currentFactIndex + 1} of {ecoFacts.length}
          </div>
        </div>
      </div>

      {/* Daily Tip */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="text-center">
          <div className="text-3xl mb-3">🌟</div>
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            Today's Eco Tip
          </h3>
          <p className="text-blue-800 text-lg">
            {dailyTips[currentTipIndex]}
          </p>
        </div>
      </div>

      {/* Eco Facts Grid */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          📚 Environmental Facts
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {ecoFacts.map((fact, index) => (
            <div
              key={fact.id}
              className={`p-6 rounded-lg border ${getImpactColor(fact.impact)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">
                  {fact.category === 'e-waste' && '📱'}
                  {fact.category === 'plastic' && '🥤'}
                  {fact.category === 'organic' && '🍎'}
                  {fact.category === 'metal' && '🥫'}
                  {fact.category === 'glass' && '🍾'}
                  {fact.category === 'paper' && '📄'}
                  {fact.category === 'general' && '🌍'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-2">
                    {fact.fact}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-75 capitalize">
                      {fact.category}
                    </span>
                    <span className="text-xs font-semibold capitalize">
                      {fact.impact} impact
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability News */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          📰 Sustainability News
        </h2>
        <div className="space-y-6">
          {sustainabilityNews.map((news) => (
            <div key={news.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {news.summary}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>📅 {new Date(news.date).toLocaleDateString()}</span>
                    <span className="capitalize">🏷️ {news.category}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <span className="inline-block bg-eco-green-100 text-eco-green-800 text-xs px-2 py-1 rounded-full">
                    {news.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Waste Management Guide */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          ♻️ Waste Management Guide
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '🥤',
              title: 'Plastic Waste',
              tips: [
                'Check recycling numbers (1-7)',
                'Rinse thoroughly before recycling',
                'Remove caps and labels',
                'Avoid single-use plastics'
              ]
            },
            {
              icon: '🥫',
              title: 'Metal Waste',
              tips: [
                'Crush cans to save space',
                'Separate aluminum from steel',
                'Remove any non-metal parts',
                'Consider selling scrap metal'
              ]
            },
            {
              icon: '🍎',
              title: 'Organic Waste',
              tips: [
                'Start a compost pile',
                'Use kitchen scraps for gardening',
                'Avoid meat and dairy in home compost',
                'Layer with dry materials'
              ]
            },
            {
              icon: '📱',
              title: 'E-Waste',
              tips: [
                'Find certified recyclers',
                'Remove personal data first',
                'Consider donation if functional',
                'Never throw in regular trash'
              ]
            },
            {
              icon: '🍾',
              title: 'Glass Waste',
              tips: [
                'Glass is infinitely recyclable',
                'Separate by color if required',
                'Remove caps and lids',
                'Don\'t break glass before disposal'
              ]
            },
            {
              icon: '📄',
              title: 'Paper Waste',
              tips: [
                'Keep paper clean and dry',
                'Flatten cardboard boxes',
                'Remove non-paper materials',
                'Shredded paper needs special handling'
              ]
            }
          ].map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {category.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="text-sm text-gray-600 flex items-start">
                    <span className="text-eco-green-500 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-eco-green-500 to-eco-green-600 rounded-xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl mb-6 opacity-90">
          Start sorting waste properly today and track your environmental impact!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/sort"
            className="bg-white text-eco-green-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
          >
            🚀 Start Sorting
          </a>
          <a
            href="/dashboard"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-eco-green-600 font-semibold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
          >
            📊 View Progress
          </a>
        </div>
      </div>
    </div>
  );
};

export default Awareness; 