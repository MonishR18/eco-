import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, RotateCcw, CameraOff, AlertCircle } from 'lucide-react';

const CameraCapture = ({ onCapture, onError, isActive }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // Use back camera by default

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      // Get camera stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsStreaming(true);
        };
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError(err.message);
      onError?.(err.message);
    }
  }, [facingMode, onError]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob
    canvas.toBlob((blob) => {
      if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        onCapture({
          blob,
          imageUrl,
          width: canvas.width,
          height: canvas.height
        });
      }
    }, 'image/jpeg', 0.8);
  }, [isStreaming, onCapture]);

  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  }, []);

  // Start camera when component mounts or isActive changes
  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, [isActive, startCamera, stopCamera]);

  // Restart camera when facing mode changes
  useEffect(() => {
    if (isActive && isStreaming) {
      startCamera();
    }
  }, [facingMode, isActive, isStreaming, startCamera]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
      >
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Camera Access Error</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={startCamera}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-64 md:h-96 object-cover rounded-xl bg-black"
      />
      
      {/* Canvas for capturing (hidden) */}
      <canvas
        ref={canvasRef}
        className="hidden"
      />

      {/* Camera Controls */}
      {isStreaming && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4"
        >
          {/* Switch Camera Button */}
          <button
            onClick={switchCamera}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
            title="Switch Camera"
          >
            <RotateCcw className="w-6 h-6 text-gray-700" />
          </button>

          {/* Capture Button */}
          <button
            onClick={captureImage}
            className="bg-eco-green-500 p-4 rounded-full shadow-lg hover:bg-eco-green-600 transition-colors"
            title="Capture Image"
          >
            <Camera className="w-8 h-8 text-white" />
          </button>
        </motion.div>
      )}

      {/* Scanning Overlay */}
      {isStreaming && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-4 border-eco-green-400 rounded-xl m-4">
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-eco-green-500"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-eco-green-500"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-eco-green-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-eco-green-500"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture; 