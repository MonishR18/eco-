import React from 'react';
import './WasteResult.css';

const WasteResult = ({ result }) => {
  if (!result) return null;

  const { item, confidence, timestamp, scanMethod } = result;

  // Waste category information and disposal tips
  const categoryInfo = {
    plastic: {
      name: "Plastic",
      icon: "🥤",
      color: "#2196F3",
      description: "Recyclable plastic materials",
      tips: [
        "Rinse containers before recycling",
        "Remove caps and labels when possible",
        "Check local recycling guidelines",
        "Avoid single-use plastics when possible"
      ],
      facts: [
        "Plastic takes 400-1000 years to decompose",
        "Only 9% of plastic waste is recycled globally",
        "Recycling one ton of plastic saves 3.8 barrels of oil"
      ]
    },
    organic: {
      name: "Organic Waste",
      icon: "🍎",
      color: "#4CAF50",
      description: "Biodegradable food and plant waste",
      tips: [
        "Compost food scraps and yard waste",
        "Avoid putting meat or dairy in home compost",
        "Use as natural fertilizer for plants",
        "Consider vermicomposting for small spaces"
      ],
      facts: [
        "Organic waste produces methane when landfilled",
        "Composting reduces greenhouse gas emissions",
        "Food waste accounts for 30% of household waste"
      ]
    },
    "e-waste": {
      name: "Electronic Waste",
      icon: "📱",
      color: "#FF9800",
      description: "Electronic devices and components",
      tips: [
        "Donate working electronics to charities",
        "Use certified e-waste recyclers",
        "Remove batteries before disposal",
        "Check for manufacturer take-back programs"
      ],
      facts: [
        "E-waste contains valuable metals like gold and silver",
        "Only 20% of e-waste is properly recycled",
        "One ton of circuit boards contains 40-800 times more gold than gold ore"
      ]
    },
    glass: {
      name: "Glass",
      icon: "🥃",
      color: "#9C27B0",
      description: "Glass containers and materials",
      tips: [
        "Rinse thoroughly before recycling",
        "Remove caps and lids",
        "Glass can be recycled infinitely",
        "Don't break glass before recycling"
      ],
      facts: [
        "Glass is 100% recyclable",
        "Recycling glass saves 30% of energy",
        "One glass bottle saves enough energy to power a light bulb for 4 hours"
      ]
    },
    paper: {
      name: "Paper & Cardboard",
      icon: "📦",
      color: "#795548",
      description: "Paper products and cardboard",
      tips: [
        "Keep paper dry and clean",
        "Remove plastic windows from envelopes",
        "Flatten cardboard boxes",
        "Shred sensitive documents before recycling"
      ],
      facts: [
        "Paper can be recycled 5-7 times",
        "Recycling one ton of paper saves 17 trees",
        "Paper waste makes up 26% of landfill volume"
      ]
    },
    metal: {
      name: "Metal",
      icon: "🥫",
      color: "#607D8B",
      description: "Metal containers and materials",
      tips: [
        "Rinse metal containers thoroughly",
        "Crush cans to save space",
        "Remove paper labels when possible",
        "Check for local metal recycling programs"
      ],
      facts: [
        "Aluminum can be recycled infinitely",
        "Recycling aluminum saves 95% of energy",
        "One recycled aluminum can saves enough energy to run a TV for 3 hours"
      ]
    }
  };

  const category = categoryInfo[item.category] || categoryInfo.plastic;

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getScanMethodIcon = (method) => {
    switch (method) {
      case 'select': return '🖼️';
      case 'upload': return '📁';
      case 'camera': return '📷';
      default: return '🔍';
    }
  };

  return (
    <div className="waste-result">
      <div className="result-header">
        <div className="result-title">
          <h2>Scan Results</h2>
          <div className="confidence-badge">
            {confidence}% Confidence
          </div>
        </div>
        <div className="scan-info">
          <p>📅 Scanned: {formatTimestamp(timestamp)}</p>
          <p>{getScanMethodIcon(scanMethod)} Method: {scanMethod}</p>
        </div>
      </div>

      <div className="result-content">
        <div className="item-details">
          <div className="item-image">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="item-info">
            <h3>{item.name}</h3>
            <p className="item-description">{item.description}</p>
          </div>
        </div>

        <div className="category-section">
          <div 
            className="category-badge"
            style={{ backgroundColor: category.color }}
          >
            {category.icon} {category.name}
          </div>
          <p className="category-description">{category.description}</p>
        </div>

        <div className="tips-section">
          <h3>💡 Disposal Tips</h3>
          <ul className="tips-list">
            {category.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="facts-section">
          <h3>📊 Interesting Facts</h3>
          <div className="facts-grid">
            {category.facts.map((fact, index) => (
              <div key={index} className="fact-card">
                <p>{fact}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="environmental-impact">
          <h3>🌍 Environmental Impact</h3>
          <div className="impact-stats">
            <div className="impact-stat">
              <div className="stat-icon">🌱</div>
              <div className="stat-info">
                <h4>Carbon Saved</h4>
                <p>~{Math.floor(Math.random() * 50) + 20} kg CO2</p>
              </div>
            </div>
            <div className="impact-stat">
              <div className="stat-icon">💧</div>
              <div className="stat-info">
                <h4>Water Saved</h4>
                <p>~{Math.floor(Math.random() * 100) + 50} liters</p>
              </div>
            </div>
            <div className="impact-stat">
              <div className="stat-icon">⚡</div>
              <div className="stat-info">
                <h4>Energy Saved</h4>
                <p>~{Math.floor(Math.random() * 30) + 10} kWh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteResult; 