import React, { useState, useRef } from 'react';
import './App.css';
import WasteScanner from './components/WasteScanner';
import WasteResult from './components/WasteResult';
import Infographics from './components/Infographics';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [scanResult, setScanResult] = useState(null);

  const handleScanComplete = (result) => {
    setScanResult(result);
    setCurrentView('result');
  };

  const renderHome = () => (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">♻️ Smart Waste Sorter</h1>
        <p className="hero-subtitle">
          Learn to sort waste correctly with our AI-powered camera simulation
        </p>
        <div className="hero-buttons">
          <button 
            className="btn btn-primary" 
            onClick={() => setCurrentView('scanner')}
          >
            📷 Start Scanning
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setCurrentView('infographics')}
          >
            📊 View Statistics
          </button>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Camera Simulation</h3>
          <p>Use your device's camera or upload images to identify waste items</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏷️</div>
          <h3>Smart Categorization</h3>
          <p>Get instant classification into plastic, organic, e-waste, and more</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💡</div>
          <h3>Disposal Tips</h3>
          <p>Learn the correct way to dispose of each type of waste</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Waste Statistics</h3>
          <p>Explore infographics about waste generation across different sectors</p>
        </div>
      </div>
    </div>
  );

  const renderScanner = () => (
    <div className="scanner-container">
      <div className="scanner-header">
        <button 
          className="btn btn-back" 
          onClick={() => setCurrentView('home')}
        >
          ← Back to Home
        </button>
        <h2>Waste Scanner</h2>
      </div>
      <WasteScanner onScanComplete={handleScanComplete} />
    </div>
  );

  const renderResult = () => (
    <div className="result-container">
      <div className="result-header">
        <button 
          className="btn btn-back" 
          onClick={() => setCurrentView('home')}
        >
          ← Back to Home
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => setCurrentView('scanner')}
        >
          🔄 Scan Another Item
        </button>
      </div>
      <WasteResult result={scanResult} />
    </div>
  );

  const renderInfographics = () => (
    <div className="infographics-container">
      <div className="infographics-header">
        <button 
          className="btn btn-back" 
          onClick={() => setCurrentView('home')}
        >
          ← Back to Home
        </button>
        <h2>Waste Statistics & Infographics</h2>
      </div>
      <Infographics />
    </div>
  );

  return (
    <div className="App">
      <div className="container">
        {currentView === 'home' && renderHome()}
        {currentView === 'scanner' && renderScanner()}
        {currentView === 'result' && renderResult()}
        {currentView === 'infographics' && renderInfographics()}
      </div>
    </div>
  );
}

export default App; 