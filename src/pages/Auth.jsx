import React, { useState, useEffect } from 'react';
import API from '../api';

export default function Auth({ initialMode = 'login', onAuth, onNavigate }) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync mode when Navbar buttons update initialMode
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (mode === 'signup' && !name.trim()) return setError('Please enter your name.');
    if (!email.includes('@')) return setError('Please enter a valid email.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');

    setLoading(true);

    try {
      const endpoint = mode === 'signup' ? '/auth/signup' : '/auth/login';
      const payload = mode === 'signup' ? { name, email, password } : { email, password };
      
      const response = await API.post(endpoint, payload);

      // Extract user object safely
      const userData = response.data.user || response.data;
      const token = response.data.token;

      // Persist session
      if (token) localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      if (onAuth) {
        onAuth(userData);
      } else if (onNavigate) {
        onNavigate('landing');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const switchMode = (newMode) => {
    setError('');
    setMode(newMode);
    if (onNavigate) {
      onNavigate(newMode);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex">
      {/* Left Image Panel */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="https://i.pinimg.com/1200x/10/47/a9/1047a956ebb45d570190a855f2359f82.jpg"
          alt="Modern home exterior at dusk"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18180F]/70 via-[#18180F]/20 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="font-['Fraunces',serif] text-4xl font-semibold text-white italic leading-tight mb-4">
            "The AI found me my dream home in under 5 minutes."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B8945A] flex items-center justify-center text-white font-bold">A</div>
            <div>
              <p className="text-white text-sm font-medium">Ayesha Noor</p>
              <p className="text-white/60 text-xs">Homeowner in Islamabad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#F7F5F0]">
        <div className="w-full max-w-md">
          <button
            onClick={() => onNavigate('landing')}
            className="font-['Fraunces',serif] text-2xl font-semibold italic text-[#18180F] mb-10 block"
          >
            Estate<span className="not-italic text-[#B8945A]">AI</span>
          </button>

          <h1 className="font-['Fraunces',serif] text-3xl font-semibold text-[#18180F] italic mb-2">
            {mode === 'login' ? 'Welcome back.' : 'Create your account.'}
          </h1>
          <p className="text-[#7A7568] text-sm mb-8">
            {mode === 'login'
              ? "Sign in to access your personalized property dashboard."
              : "Get started with AI-powered property search in seconds."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-sm font-medium text-[#18180F] mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ayesha Noor"
                  className="w-full px-4 py-3 bg-white border border-[#E2DDD4] rounded-lg text-sm text-[#18180F] placeholder-[#C5BFB5] outline-none focus:border-[#B8945A] focus:ring-2 focus:ring-[#B8945A]/20 transition-all"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-[#18180F] mb-1.5 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ayesha@example.com"
                className="w-full px-4 py-3 bg-white border border-[#E2DDD4] rounded-lg text-sm text-[#18180F] placeholder-[#C5BFB5] outline-none focus:border-[#B8945A] focus:ring-2 focus:ring-[#B8945A]/20 transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#18180F] mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white border border-[#E2DDD4] rounded-lg text-sm text-[#18180F] placeholder-[#C5BFB5] outline-none focus:border-[#B8945A] focus:ring-2 focus:ring-[#B8945A]/20 transition-all"
              />
            </div>

            {error && (
              <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#18180F] hover:bg-[#2a2a1a] disabled:opacity-60 text-[#F7F5F0] font-medium py-3.5 rounded-lg transition-colors mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {mode === 'login' ? 'Signing in…' : 'Creating account…'}
                </span>
              ) : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-[#7A7568] mt-6">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button onClick={() => switchMode('signup')} className="text-[#B8945A] font-medium hover:underline">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => switchMode('login')} className="text-[#B8945A] font-medium hover:underline">
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}