import React, { useState, useEffect, useRef } from 'react';
import API from '../api';

export default function AIPromptBar({ onSearchResults, setLoading: setParentLoading, initialQuery = '' }) {
  const [prompt, setPrompt] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  
  const timer1Ref = useRef(null);
  const timer2Ref = useRef(null);

  const clearTimers = () => {
    if (timer1Ref.current) clearTimeout(timer1Ref.current);
    if (timer2Ref.current) clearTimeout(timer2Ref.current);
  };

  const executeSearch = async (searchPrompt) => {
    const trimmed = searchPrompt.trim();
    if (!trimmed) return;

    clearTimers();
    setLoading(true);
    if (setParentLoading) setParentLoading(true);
    setStatusMessage('🤖 Extracting search intent...');

    timer1Ref.current = setTimeout(() => setStatusMessage('🌐 Agent searching live property portals...'), 1200);
    timer2Ref.current = setTimeout(() => setStatusMessage('✨ Normalizing properties to match your budget...'), 2800);

    try {
      const res = await API.post('/ai/agent-search', { prompt: trimmed });
      if (onSearchResults) {
        onSearchResults(res.data);
      }
    } catch (err) {
      console.error('LLM search error:', err);
      alert('Search failed. Please check your backend connection and API key settings.');
    } finally {
      clearTimers();
      setLoading(false);
      if (setParentLoading) setParentLoading(false);
      setStatusMessage('');
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setPrompt(initialQuery);
      executeSearch(initialQuery);
    }
    return () => clearTimers();
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    executeSearch(prompt);
  };

  return (
    <div className="w-full max-w-3xl mx-auto font-['Outfit',sans-serif]">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E2DDD4] p-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8945A] mb-2">
          Autonomous AI Property Finder
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Find me a 3 bedroom house in Islamabad or Rawalpindi under 2.5 Crore with modern design"
          className="w-full p-2 bg-transparent text-[#18180F] placeholder-[#C5BFB5] focus:outline-none resize-none h-20 text-base"
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2 border-t border-[#EDEAE2] pt-3">
          <span className="text-xs text-[#7A7568] italic">
            {loading ? statusMessage : 'Type your requirement in plain English'}
          </span>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#18180F] text-white rounded-xl text-sm font-medium hover:bg-[#B8945A] transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Agent Searching...' : 'Search Properties'}
          </button>
        </div>
      </form>
    </div>
  );
}