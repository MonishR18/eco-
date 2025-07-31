import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { TrackerProvider } from './context/TrackerContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import SortWaste from './pages/SortWaste';
import Tracker from './pages/Tracker';
import Dashboard from './pages/Dashboard';
import Rewards from './pages/Rewards';
import LearnHub from './pages/LearnHub';
import SocialTasks from './pages/SocialTasks';
import Locations from './pages/Locations';
import Privacy from './pages/Privacy';
import Feedback from './pages/Feedback';

// Components
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <TrackerProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sort" element={<SortWaste />} />
                  <Route path="/tracker" element={<Tracker />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/rewards" element={<Rewards />} />
                  <Route path="/learn" element={<LearnHub />} />
                  <Route path="/tasks" element={<SocialTasks />} />
                  <Route path="/locations" element={<Locations />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/feedback" element={<Feedback />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </TrackerProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App; 