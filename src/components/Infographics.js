import React, { useState } from 'react';
import './Infographics.css';

const Infographics = () => {
  const [activeSector, setActiveSector] = useState('household');

  const sectorData = {
    household: {
      name: "Household Waste",
      icon: "🏠",
      color: "#4CAF50",
      stats: {
        totalWaste: "2.5 billion tons",
        recyclingRate: "32%",
        compostRate: "8%",
        landfillRate: "60%"
      },
      breakdown: [
        { category: "Food Waste", percentage: 30, color: "#FF9800" },
        { category: "Paper & Cardboard", percentage: 25, color: "#795548" },
        { category: "Plastic", percentage: 20, color: "#2196F3" },
        { category: "Glass", percentage: 10, color: "#9C27B0" },
        { category: "Metal", percentage: 8, color: "#607D8B" },
        { category: "Other", percentage: 7, color: "#757575" }
      ],
      tips: [
        "Separate waste into different bins",
        "Compost food scraps and yard waste",
        "Reduce single-use items",
        "Buy products with less packaging"
      ]
    },
    industrial: {
      name: "Industrial Waste",
      icon: "🏭",
      color: "#FF5722",
      stats: {
        totalWaste: "7.6 billion tons",
        recyclingRate: "45%",
        compostRate: "2%",
        landfillRate: "53%"
      },
      breakdown: [
        { category: "Construction Debris", percentage: 35, color: "#795548" },
        { category: "Manufacturing Waste", percentage: 25, color: "#607D8B" },
        { category: "Chemical Waste", percentage: 15, color: "#F44336" },
        { category: "Electronic Waste", percentage: 12, color: "#FF9800" },
        { category: "Plastic Waste", percentage: 8, color: "#2196F3" },
        { category: "Other", percentage: 5, color: "#757575" }
      ],
      tips: [
        "Implement waste reduction programs",
        "Use recycled materials in production",
        "Proper hazardous waste disposal",
        "Energy recovery from waste"
      ]
    },
    campus: {
      name: "Campus Waste",
      icon: "🎓",
      color: "#2196F3",
      stats: {
        totalWaste: "500 million tons",
        recyclingRate: "28%",
        compostRate: "15%",
        landfillRate: "57%"
      },
      breakdown: [
        { category: "Paper & Cardboard", percentage: 40, color: "#795548" },
        { category: "Food Waste", percentage: 25, color: "#FF9800" },
        { category: "Plastic", percentage: 15, color: "#2196F3" },
        { category: "Electronic Waste", percentage: 10, color: "#FF5722" },
        { category: "Glass", percentage: 5, color: "#9C27B0" },
        { category: "Other", percentage: 5, color: "#757575" }
      ],
      tips: [
        "Install recycling bins throughout campus",
        "Implement composting programs",
        "Digital document management",
        "Student awareness campaigns"
      ]
    }
  };

  const currentSector = sectorData[activeSector];

  const renderPieChart = (data) => {
    return (
      <div className="pie-chart">
        <div className="pie-chart-container">
          {data.map((item, index) => {
            const rotation = data
              .slice(0, index)
              .reduce((sum, d) => sum + d.percentage, 0) * 3.6;
            
            return (
              <div
                key={index}
                className="pie-segment"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  background: `conic-gradient(${item.color} 0deg ${item.percentage * 3.6}deg, transparent ${item.percentage * 3.6}deg)`
                }}
              />
            );
          })}
        </div>
        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: item.color }}
              />
              <span>{item.category} ({item.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProgressBar = (label, percentage, color) => (
    <div className="progress-item">
      <div className="progress-label">
        <span>{label}</span>
        <span>{percentage}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: color 
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="infographics">
      <div className="sector-tabs">
        {Object.entries(sectorData).map(([key, sector]) => (
          <button
            key={key}
            className={`sector-tab ${activeSector === key ? 'active' : ''}`}
            onClick={() => setActiveSector(key)}
            style={{ borderColor: sector.color }}
          >
            <span className="sector-icon">{sector.icon}</span>
            <span>{sector.name}</span>
          </button>
        ))}
      </div>

      <div className="sector-content">
        <div className="sector-header">
          <h2>{currentSector.icon} {currentSector.name}</h2>
          <p>Annual waste generation and management statistics</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <h3>Total Waste</h3>
            <p className="stat-value">{currentSector.stats.totalWaste}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">♻️</div>
            <h3>Recycling Rate</h3>
            <p className="stat-value">{currentSector.stats.recyclingRate}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌱</div>
            <h3>Compost Rate</h3>
            <p className="stat-value">{currentSector.stats.compostRate}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🗑️</div>
            <h3>Landfill Rate</h3>
            <p className="stat-value">{currentSector.stats.landfillRate}</p>
          </div>
        </div>

        <div className="charts-section">
          <div className="waste-breakdown">
            <h3>Waste Composition</h3>
            {renderPieChart(currentSector.breakdown)}
          </div>

          <div className="management-progress">
            <h3>Waste Management Progress</h3>
            <div className="progress-bars">
              {renderProgressBar("Recycling", parseInt(currentSector.stats.recyclingRate), "#4CAF50")}
              {renderProgressBar("Composting", parseInt(currentSector.stats.compostRate), "#8BC34A")}
              {renderProgressBar("Landfill", parseInt(currentSector.stats.landfillRate), "#FF5722")}
            </div>
          </div>
        </div>

        <div className="tips-section">
          <h3>💡 Improvement Tips</h3>
          <div className="tips-grid">
            {currentSector.tips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-number">{index + 1}</div>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="global-stats">
          <h3>🌍 Global Waste Statistics</h3>
          <div className="global-grid">
            <div className="global-stat">
              <h4>2.01 Billion Tons</h4>
              <p>Municipal solid waste generated annually</p>
            </div>
            <div className="global-stat">
              <h4>33%</h4>
              <p>Waste is openly dumped or burned</p>
            </div>
            <div className="global-stat">
              <h4>13.5%</h4>
              <p>Waste is recycled globally</p>
            </div>
            <div className="global-stat">
              <h4>5.5%</h4>
              <p>Waste is composted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infographics; 