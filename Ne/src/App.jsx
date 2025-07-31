import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import Navigation from './components/Shared/Navigation';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import SortWaste from './pages/SortWaste';
import Tracker from './pages/Tracker';
import Rewards from './pages/Rewards';
import SocialTasks from './pages/SocialTasks';
import LearnHub from './pages/LearnHub';
import Locations from './pages/Locations';
import Feedback from './pages/Feedback';
import Privacy from './pages/Privacy';
import LoadingSpinner from './components/Shared/LoadingSpinner';
import ThemeSelector from './components/Shared/ThemeSelector';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) { return <LoadingSpinner />; }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const { isAuthenticated, loading } = useAuth();
  const { isDark } = useTheme();
  
  if (loading) { return <LoadingSpinner />; }
  
  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
        {isAuthenticated && <Navigation />}
        <main className={isAuthenticated ? 'pt-16' : ''}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/sort-waste" element={<PrivateRoute><SortWaste /></PrivateRoute>} />
            <Route path="/tracker" element={<PrivateRoute><Tracker /></PrivateRoute>} />
            <Route path="/rewards" element={<PrivateRoute><Rewards /></PrivateRoute>} />
            <Route path="/social-tasks" element={<PrivateRoute><SocialTasks /></PrivateRoute>} />
            <Route path="/learn" element={<PrivateRoute><LearnHub /></PrivateRoute>} />
            <Route path="/locations" element={<PrivateRoute><Locations /></PrivateRoute>} />
            <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        {/* Theme Selector for non-authenticated users */}
        {!isAuthenticated && <ThemeSelector />}
      </div>
    </Router>
  );
};

export default App;
