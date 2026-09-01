import React, { useState } from 'react';
import API from '../api';

export default function AIPromptBar({ onSearchResults }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setStatusMessage('🤖 Extracting search intent...');

    try {
      setTimeout(() => setStatusMessage('🌐 Agent searching live property portals...'), 1200);
      setTimeout(() => setStatusMessage('✨ Normalizing properties to match your budget...'), 2800);

      const res = await API.post('/ai/agent-search', { prompt });
      onSearchResults(res.data);
    } catch (err) {
      console.error('LLM search error:', err);
      alert('Search failed. Please check your backend connection and API key settings.');
    } finally {
      setLoading(false);
      setStatusMessage('');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto font-['Outfit',sans-serif]">
      <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-sm border border-[#E2DDD4] p-4">
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
            className="px-6 py-2.5 bg-[#18180F] text-white rounded-xl text-sm font-medium hover:bg-[#B8945A] transition-all disabled:opacity-50"
          >
            {loading ? 'Agent Searching...' : 'Search Properties'}
          </button>
        </div>
      </form>
    </div>
  );
}