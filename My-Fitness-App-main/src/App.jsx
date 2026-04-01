import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WorkoutLog from './pages/WorkoutLog';
import CalorieTracker from './pages/CalorieTracker';
import Calculators from './pages/Calculators';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/workouts">Workouts</Link>
        <Link to="/calories">Calories</Link>
        <Link to="/calculators">Calculators</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workouts" element={<WorkoutLog />} />
        <Route path="/calories" element={<CalorieTracker />} />
        <Route path="/calculators" element={<Calculators />} />
      </Routes>
    </Router>
  );
}
export default App;
