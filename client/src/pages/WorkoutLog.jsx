import { useState, useEffect, useRef } from 'react';

const WorkoutLog = () => {
  const canvasRef = useRef(null);
  const [workouts, setWorkouts] = useState([]);
  const [activity, setActivity] = useState({ type: '', duration: '' });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('http://localhost:5000/api/workouts', { signal })
      .then(res => res.json())
      .then(data => setWorkouts(data))
      .catch(err => {
        if (err.name !== 'AbortError') console.error('Fetch error:', err);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 18px Inter, sans-serif';
      ctx.fillText(`Workouts: ${workouts.length}`, 14, 30);

      const barWidth = 42;
      const gap = 14;
      workouts.slice(0, 10).forEach((item, index) => {
        const height = Math.min(120, Number(item.duration) * 2 + 20);
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(14 + index * (barWidth + gap), 140 - height, barWidth, height);
      });
    };

    draw();
  }, [workouts]);

  const addWorkout = async (e) => {
    e.preventDefault();
    if (!activity.type || !activity.duration) return;
    
    const newWorkout = { 
      type: activity.type,
      duration: activity.duration,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    
    try {
      const response = await fetch('http://localhost:5000/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWorkout)
      });
      const savedWorkout = await response.json();
      setWorkouts([savedWorkout, ...workouts]);
      setActivity({ type: '', duration: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/workouts/${id}`, { method: 'DELETE' });
      setWorkouts(workouts.filter(w => (w._id || w.id) !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Column: Form Card */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100 sticky top-24">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-800">Track Effort</h2>
                <p className="text-slate-500 text-sm">What did you crush today?</p>
              </div>

              <form onSubmit={addWorkout} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Activity Type</label>
                  <input 
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                    placeholder="e.g. Heavy Squats" 
                    value={activity.type}
                    onChange={(e) => setActivity({...activity, type: e.target.value})} 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Duration (Min)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                    placeholder="0" 
                    value={activity.duration}
                    onChange={(e) => setActivity({...activity, duration: e.target.value})} 
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Log Session</span>
                  <span className="text-xl">⚡</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: History List */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                <h3 className="font-bold text-lg">Workout History</h3>
                <span className="bg-blue-500 text-[10px] px-2 py-1 rounded-full uppercase font-black">
                  {workouts.length} Total
                </span>
              </div>

              <div className="p-4 bg-white border-b border-slate-100">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={160}
                  className="w-full rounded-xl border border-slate-200"
                />
              </div>

              <div className="divide-y divide-slate-100">
                {workouts.length === 0 ? (
                  <div className="p-20 text-center">
                    <p className="text-slate-300 text-lg font-medium italic">No workouts logged yet. Time to move!</p>
                  </div>
                ) : (
                  workouts.map(w => (
                    <div key={w._id || w.id} className="p-5 flex items-center justify-between group hover:bg-blue-50/30 transition-colors">
                      <div className="flex items-center gap-5">
                        <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center text-xl">
                          💪
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-lg">{w.type}</p>
                          <p className="text-sm text-slate-400 font-medium">{w.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-black text-slate-900">{w.duration}</p>
                          <p className="text-[10px] uppercase font-bold text-slate-400">Minutes</p>
                        </div>
                        <button 
                          onClick={() => deleteWorkout(w._id || w.id)}
                          className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <svg xmlns="http://www.w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkoutLog;
