import { useState } from 'react';

const Calculators = () => {
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    const height = e.target.height.value / 100;
    const weight = e.target.weight.value;
    
    if (height > 0 && weight > 0) {
      const score = (weight / (height * height)).toFixed(1);
      setBmi(score);
      
      // Add logic for BMI category for better UX
      if (score < 18.5) setCategory("Underweight");
      else if (score < 25) setCategory("Normal weight");
      else if (score < 30) setCategory("Overweight");
      else setCategory("Obese");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex justify-center items-start pt-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">BMI Calculator</h2>
        
        <form onSubmit={calculateBMI} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Height (cm)</label>
            <input 
              name="height" 
              placeholder="e.g. 175" 
              type="number" 
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Weight (kg)</label>
            <input 
              name="weight" 
              placeholder="e.g. 70" 
              type="number" 
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md active:transform active:scale-95"
          >
            Calculate BMI
          </button>
        </form>

        {bmi && (
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 text-center animate-in fade-in zoom-in duration-300">
            <p className="text-slate-600 text-sm uppercase tracking-wide font-semibold">Your Result</p>
            <h3 className="text-4xl font-black text-blue-600 my-1">{bmi}</h3>
            <p className="text-blue-800 font-medium">{category}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculators;
