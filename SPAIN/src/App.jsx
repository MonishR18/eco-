import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SortWaste from './pages/SortWaste';
import Dashboard from './pages/Dashboard';
import Awareness from './pages/Awareness';
import HardwareDemo from './pages/HardwareDemo';
import OfflineBanner from './components/OfflineBanner';
import InstallPrompt from './components/InstallPrompt';
import { isOffline } from './utils/storage';

function App() {
  const [offline, setOffline] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Handle online/offline status
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setOffline(isOffline());

    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
        setDeferredPrompt(null);
      }
    }
  };

  const dismissInstallPrompt = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-eco-green-50">
        {offline && <OfflineBanner />}
        {showInstallPrompt && (
          <InstallPrompt 
            onInstall={handleInstallApp}
            onDismiss={dismissInstallPrompt}
          />
        )}
        
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sort" element={<SortWaste />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/awareness" element={<Awareness />} />
            <Route path="/hardware" element={<HardwareDemo />} />
          </Routes>
        </main>
        
        <footer className="bg-eco-green-800 text-white py-6 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              🌱 EcoVision - Making waste sorting smarter for a sustainable future
            </p>
            <p className="text-xs mt-2 opacity-75">
              Built with React & Tailwind CSS | PWA Ready
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App; 