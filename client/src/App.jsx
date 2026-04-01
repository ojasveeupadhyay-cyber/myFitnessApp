import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WorkoutLog from './pages/WorkoutLog';
import CalorieTracker from './pages/CalorieTracker';
import Calculators from './pages/Calculators';
import Login from './pages/Login';
import Navbar from './components/Navbar.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('fitness_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsAuthLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('fitness_user');
    setUser(null);
  };

  if (isAuthLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">Loading...</div>;
  }

  if (!user) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workouts" element={<WorkoutLog />} />
          <Route path="/calories" element={<CalorieTracker />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
