import React, { useState, useRef } from 'react';

const CameraInput = ({ onImageSelect, onTextInput, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [textDescription, setTextDescription] = useState('');
  const fileInputRef = useRef(null);
  const cameraRef = useRef(null);
  const recognitionIntervalRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textDescription.trim()) {
      onTextInput(textDescription.trim());
      setTextDescription('');
      setShowTextInput(false);
    }
  };

  const openCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (cameraRef.current) {
            cameraRef.current.srcObject = stream;
            setShowCamera(true);
            // Start real-time recognition after camera loads
            cameraRef.current.onloadedmetadata = () => {
              startRealTimeRecognition();
            };
          }
        })
        .catch((err) => {
          console.error('Camera access denied:', err);
          alert('Camera access denied. Please use file upload instead.');
        });
    } else {
      alert('Camera not available. Please use file upload instead.');
    }
  };

  const startRealTimeRecognition = () => {
    setIsRecognizing(true);
    setRecognitionResult(null);
    
    // Start recognition every 2 seconds
    recognitionIntervalRef.current = setInterval(() => {
      if (cameraRef.current && cameraRef.current.videoWidth > 0) {
        captureAndAnalyze();
      }
    }, 2000);
  };

  const stopRealTimeRecognition = () => {
    if (recognitionIntervalRef.current) {
      clearInterval(recognitionIntervalRef.current);
      recognitionIntervalRef.current = null;
    }
    setIsRecognizing(false);
  };

  const captureAndAnalyze = () => {
    if (cameraRef.current) {
      const canvas = document.createElement('canvas');
      const video = cameraRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'real-time-capture.jpg', { type: 'image/jpeg' });
        // Simulate real-time analysis
        simulateRealTimeAnalysis(file);
      }, 'image/jpeg');
    }
  };

  const simulateRealTimeAnalysis = (imageFile) => {
    // Simulate AI analysis with random results
    const wasteTypes = ['plastic', 'metal', 'organic', 'e-waste', 'glass', 'paper'];
    const randomType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
    const confidence = Math.random() * 0.4 + 0.6; // 60-100% confidence
    
    setRecognitionResult({
      type: randomType,
      confidence: confidence,
      timestamp: new Date().toLocaleTimeString(),
      imageFile: imageFile
    });
  };

  const capturePhoto = () => {
    if (cameraRef.current) {
      const canvas = document.createElement('canvas');
      const video = cameraRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        onImageSelect(file);
        
        // Stop camera stream and recognition
        stopRealTimeRecognition();
        const stream = video.srcObject;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        video.srcObject = null;
        setShowCamera(false);
        setRecognitionResult(null);
      }, 'image/jpeg');
    }
  };

  const confirmRecognition = () => {
    if (recognitionResult) {
      onImageSelect(recognitionResult.imageFile);
      stopRealTimeRecognition();
      setShowCamera(false);
      setRecognitionResult(null);
      
      // Stop camera stream
      const stream = cameraRef.current?.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (cameraRef.current) {
        cameraRef.current.srcObject = null;
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${
          dragActive
            ? 'border-eco-green-400 bg-eco-green-50'
            : 'border-gray-300 hover:border-eco-green-300 hover:bg-eco-green-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="text-6xl">📸</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload or Capture Waste Image
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop an image, or click to browse files
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📁 Choose File
            </button>
            
            <button
              onClick={openCamera}
              disabled={isProcessing}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📷 Use Camera
            </button>
            
            <button
              onClick={() => setShowTextInput(!showTextInput)}
              disabled={isProcessing}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✍️ Describe Item
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isProcessing}
          />
        </div>
      </div>

      {/* Camera View */}
      {showCamera && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            📷 Live Waste Recognition
          </h3>
          
          {/* Recognition Status */}
          {isRecognizing && (
            <div className="text-center mb-4">
              <div className="inline-flex items-center space-x-2 bg-eco-green-100 text-eco-green-800 px-4 py-2 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-eco-green-600"></div>
                <span className="font-medium">🔍 Scanning for waste items...</span>
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Camera Feed */}
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-2">Live Camera Feed</h4>
              <video
                ref={cameraRef}
                autoPlay
                playsInline
                className="w-full rounded-lg border border-gray-300"
              />
            </div>
            
            {/* Recognition Results */}
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-2">Recognition Results</h4>
              {recognitionResult ? (
                <div className="bg-eco-green-50 border border-eco-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Last detected at {recognitionResult.timestamp}</span>
                    <span className="text-xs bg-eco-green-200 text-eco-green-800 px-2 py-1 rounded">
                      {Math.round(recognitionResult.confidence * 100)}% confidence
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-2">
                      {recognitionResult.type === 'plastic' && '🥤'}
                      {recognitionResult.type === 'metal' && '🥫'}
                      {recognitionResult.type === 'organic' && '🍎'}
                      {recognitionResult.type === 'e-waste' && '📱'}
                      {recognitionResult.type === 'glass' && '🍾'}
                      {recognitionResult.type === 'paper' && '📄'}
                    </div>
                    <h5 className="text-lg font-semibold text-gray-900 capitalize">
                      {recognitionResult.type}
                    </h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {recognitionResult.type === 'plastic' && 'Non-Biodegradable'}
                      {recognitionResult.type === 'metal' && 'Recyclable'}
                      {recognitionResult.type === 'organic' && 'Biodegradable'}
                      {recognitionResult.type === 'e-waste' && 'Special Handling'}
                      {recognitionResult.type === 'glass' && 'Recyclable'}
                      {recognitionResult.type === 'paper' && 'Recyclable'}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={confirmRecognition}
                      className="btn-primary flex-1"
                    >
                      ✅ Confirm & Process
                    </button>
                    <button
                      onClick={() => setRecognitionResult(null)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      🔄 Rescan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-gray-600">Point camera at waste item to start recognition</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={capturePhoto}
              className="btn-primary"
            >
              📸 Manual Capture
            </button>
            <button
              onClick={() => {
                stopRealTimeRecognition();
                const stream = cameraRef.current?.srcObject;
                if (stream) {
                  stream.getTracks().forEach(track => track.stop());
                }
                if (cameraRef.current) {
                  cameraRef.current.srcObject = null;
                }
                setShowCamera(false);
                setRecognitionResult(null);
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              ❌ Close Camera
            </button>
          </div>
        </div>
      )}

      {/* Text Input */}
      {showTextInput && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Describe the waste item
          </h3>
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <textarea
              value={textDescription}
              onChange={(e) => setTextDescription(e.target.value)}
              placeholder="e.g., plastic water bottle, aluminum can, apple core, old phone..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent resize-none"
              rows="3"
              disabled={isProcessing}
            />
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={!textDescription.trim() || isProcessing}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🔍 Analyze
              </button>
              <button
                type="button"
                onClick={() => setShowTextInput(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-eco-green-500"></div>
            <span className="text-gray-600">Analyzing waste item...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraInput; 