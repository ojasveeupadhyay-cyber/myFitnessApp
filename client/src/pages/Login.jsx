import { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please provide both name and email.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      if (!res.ok) {
        throw new Error('Authentication failed');
      }

      const user = await res.json();
      localStorage.setItem('fitness_user', JSON.stringify(user));
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 overflow-hidden">
      {/* Background Graphic Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-md p-8 md:p-10 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-white/50 m-4">
        <div className="text-center mb-8">
          <div className="h-20 w-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 transform transition-transform hover:scale-105 hover:rotate-3 duration-300">
             <span className="text-4xl text-white font-black">⚡</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">FitnessTracker</h1>
          <p className="text-slate-500 mt-2 font-medium">Your journey starts here.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold text-center border border-red-100 transition-all">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
            <input 
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-300 text-slate-800 font-medium placeholder:text-slate-400"
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-300 text-slate-800 font-medium placeholder:text-slate-400"
              placeholder="john@example.com"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full mt-8 bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-900/20 transition-all duration-300 flex items-center justify-center gap-2
              ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600 hover:-translate-y-1 hover:shadow-blue-600/30 active:scale-95'}`}
          >
            {isLoading ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <>
                <span>Enter Tracker</span>
                <svg xmlns="http://www.w3.org" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </form>
        
        <p className="text-center text-xs text-slate-400 font-medium mt-8">
          By entering, you're tracking your path to greatness. <br className="hidden md:block" /> No password needed for this demo!
        </p>
      </div>
    </div>
  );
}
