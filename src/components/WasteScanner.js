import React, { useState, useRef } from 'react';
import './WasteScanner.css';

const WasteScanner = ({ onScanComplete }) => {
  const [scanMode, setScanMode] = useState('select');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  // Dummy waste items with images and categories
  const dummyWasteItems = [
    {
      id: 1,
      name: "Plastic Water Bottle",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      category: "plastic",
      description: "A clear plastic water bottle"
    },
    {
      id: 2,
      name: "Apple Core",
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&h=300&fit=crop",
      category: "organic",
      description: "A partially eaten apple core"
    },
    {
      id: 3,
      name: "Old Smartphone",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      category: "e-waste",
      description: "An outdated smartphone"
    },
    {
      id: 4,
      name: "Glass Jar",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      category: "glass",
      description: "A clear glass jar"
    },
    {
      id: 5,
      name: "Cardboard Box",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      category: "paper",
      description: "A brown cardboard box"
    },
    {
      id: 6,
      name: "Aluminum Can",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      category: "metal",
      description: "A metal beverage can"
    }
  ];

  const simulateScan = (item) => {
    setIsScanning(true);
    setSelectedImage(item.image);
    
    // Simulate AI processing time
    setTimeout(() => {
      const result = {
        item: item,
        confidence: Math.floor(Math.random() * 30) + 70, // 70-99% confidence
        timestamp: new Date().toISOString(),
        scanMethod: scanMode
      };
      
      setIsScanning(false);
      onScanComplete(result);
    }, 2000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        // Simulate processing uploaded image
        setTimeout(() => {
          const randomItem = dummyWasteItems[Math.floor(Math.random() * dummyWasteItems.length)];
          const result = {
            item: randomItem,
            confidence: Math.floor(Math.random() * 30) + 70,
            timestamp: new Date().toISOString(),
            scanMethod: 'upload'
          };
          onScanComplete(result);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // Simulate camera capture
    const randomItem = dummyWasteItems[Math.floor(Math.random() * dummyWasteItems.length)];
    setSelectedImage(randomItem.image);
    simulateScan(randomItem);
  };

  return (
    <div className="waste-scanner">
      <div className="scanner-modes">
        <button 
          className={`mode-btn ${scanMode === 'select' ? 'active' : ''}`}
          onClick={() => setScanMode('select')}
        >
          🖼️ Select Sample Image
        </button>
        <button 
          className={`mode-btn ${scanMode === 'upload' ? 'active' : ''}`}
          onClick={() => setScanMode('upload')}
        >
          📁 Upload Image
        </button>
        <button 
          className={`mode-btn ${scanMode === 'camera' ? 'active' : ''}`}
          onClick={() => setScanMode('camera')}
        >
          📷 Use Camera
        </button>
      </div>

      {scanMode === 'select' && (
        <div className="sample-images">
          <h3>Choose a sample waste item to scan:</h3>
          <div className="image-grid">
            {dummyWasteItems.map((item) => (
              <div 
                key={item.id} 
                className="sample-item"
                onClick={() => simulateScan(item)}
              >
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {scanMode === 'upload' && (
        <div className="upload-section">
          <h3>Upload an image of waste item:</h3>
          <div className="upload-area" onClick={() => fileInputRef.current.click()}>
            <div className="upload-icon">📁</div>
            <p>Click to upload image</p>
            <p className="upload-hint">Supports JPG, PNG, GIF</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {scanMode === 'camera' && (
        <div className="camera-section">
          <h3>Camera Simulation</h3>
          <div className="camera-preview">
            <div className="camera-frame">
              <div className="camera-placeholder">
                📷 Camera Preview
              </div>
            </div>
            <button 
              className="btn btn-primary capture-btn"
              onClick={handleCameraCapture}
              disabled={isScanning}
            >
              {isScanning ? '🔍 Scanning...' : '📸 Capture Image'}
            </button>
          </div>
        </div>
      )}

      {isScanning && (
        <div className="scanning-overlay">
          <div className="scanning-animation">
            <div className="scan-line"></div>
          </div>
          <p>Analyzing waste item...</p>
        </div>
      )}
    </div>
  );
};

export default WasteScanner; 