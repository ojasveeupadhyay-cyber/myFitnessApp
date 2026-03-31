import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Dashboard() {
  const [meals] = useLocalStorage('my-meals', []);
  const [workouts] = useLocalStorage('my-workouts', []);

  const totalCalories = meals.reduce((sum, m) => sum + Number(m.calories), 0);
  const workoutCount = workouts.length;
  
  // Example goal for the progress bar
  const calorieGoal = 2500;
  const progressPercent = Math.min((totalCalories / calorieGoal) * 100, 100);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Fitness Overview</h1>
          <p className="text-slate-500">Track your progress and stay on top of your goals.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Enhanced Calorie Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-orange-600 font-bold">Kcal</span>
              </div>
              <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">Daily Energy</h3>
              <p className="text-4xl font-black text-slate-900">{totalCalories.toLocaleString()}</p>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                <span>Goal: {calorieGoal}</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-orange-500 h-full transition-all duration-1000" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Workout Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-blue-600 font-bold">🏋️</span>
            </div>
            <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">Workouts</h3>
            <p className="text-4xl font-black text-slate-900">{workoutCount}</p>
            <p className="text-sm text-blue-500 font-semibold mt-2">+2 from last week</p>
          </div>

          {/* New "Quick Action" Card */}
          <div className="bg-slate-900 p-6 rounded-3xl shadow-lg text-white flex flex-col justify-center items-center text-center">
            <h3 className="text-lg font-bold mb-2">Ready for more?</h3>
            <p className="text-slate-400 text-sm mb-4">Consistency is the key to progress.</p>
            <button className="bg-white text-slate-900 font-bold px-6 py-2 rounded-full hover:bg-blue-400 transition-colors">
              Log Workout
            </button>
          </div>
        </div>
        
        {/* Recent Activity Table style */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h3 className="text-xl font-bold text-slate-800">Recent Activity</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {workouts.length > 0 ? (
              workouts.slice(0, 5).reverse().map(w => (
                <div key={w.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-lg">
                      {w.name.toLowerCase().includes('run') ? '🏃' : '💪'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{w.name}</p>
                      <p className="text-xs text-slate-400">{w.date || 'Today'}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                    {w.sets} sets × {w.reps} reps
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-slate-400 italic">No activities recorded yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
