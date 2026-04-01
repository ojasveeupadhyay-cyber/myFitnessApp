import { useState, useEffect } from 'react';

export default function CalorieTracker() {
  const [meals, setMeals] = useState([]);
  const [food, setFood] = useState({ name: '', calories: '' });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('http://localhost:5000/api/meals', { signal })
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => {
        if (err.name !== 'AbortError') console.error('Fetch error:', err);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const addMeal = async (e) => {
    e.preventDefault();
    if (!food.name || !food.calories) return;
    
    const newMeal = {
      name: food.name,
      calories: Number(food.calories)
    };

    try {
      const res = await fetch('http://localhost:5000/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMeal)
      });
      const savedMeal = await res.json();
      setMeals([savedMeal, ...meals]);
      setFood({ name: '', calories: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMeal = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/meals/${id}`, { method: 'DELETE' });
      setMeals(meals.filter(meal => (meal._id || meal.id) !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const totalCalories = meals.reduce((sum, m) => sum + Number(m.calories), 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Stats */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 shadow-lg mb-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-xl opacity-90">Daily Consumption</h1>
            <p className="text-5xl font-black">{totalCalories} <span className="text-xl font-normal">kcal</span></p>
          </div>
          <div className="hidden md:block">
             <div className="h-16 w-16 border-4 border-white/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">🍎</span>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Log New Meal</h2>
              <form onSubmit={addMeal} className="space-y-4">
                <input 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  placeholder="e.g. Avocado Toast" 
                  value={food.name} 
                  onChange={(e) => setFood({...food, name: e.target.value})} 
                />
                <input 
                  type="number" 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  placeholder="Calories (kcal)" 
                  value={food.calories} 
                  onChange={(e) => setFood({...food, calories: e.target.value})} 
                />
                <button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-md shadow-orange-200 transition-all active:scale-95"
                >
                  Add to Diary
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-bold text-slate-700">Meal History</h2>
              </div>
              <ul className="divide-y divide-slate-100">
                {meals.length === 0 ? (
                  <li className="p-8 text-center text-slate-400 italic">No meals logged yet today.</li>
                ) : (
                  meals.map(m => (
                    <li key={m._id || m.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors group">
                      <div>
                        <p className="font-semibold text-slate-800">{m.name}</p>
                        <p className="text-sm text-slate-500">{m.calories} calories</p>
                      </div>
                      <button 
                        onClick={() => deleteMeal(m._id || m.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-all"
                        title="Delete entry"
                      >
                        <svg xmlns="http://www.w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
