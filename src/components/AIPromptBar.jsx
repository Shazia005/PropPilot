import React, { useState, useEffect, useRef } from 'react';
import API from '../api';

export default function AIPromptBar({
  onSearchResults,
  setLoading: setParentLoading,
  initialQuery = ''
}) {
  const [prompt, setPrompt] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const timer1Ref = useRef(null);

  // Prevent the same initial query from being searched twice
  const lastInitialQueryRef = useRef('');

  // Prevent multiple API requests at the same time
  const requestInProgressRef = useRef(false);

  // -----------------------------------------------------------
  // Clear timers
  // -----------------------------------------------------------

  const clearTimers = () => {
    if (timer1Ref.current) {
      clearTimeout(timer1Ref.current);
      timer1Ref.current = null;
    }
  };

  // -----------------------------------------------------------
  // Main AI search
  // -----------------------------------------------------------

  const executeSearch = async (searchPrompt) => {
    const trimmed = searchPrompt.trim();

    if (!trimmed) {
      return;
    }

    // Prevent duplicate requests
    if (requestInProgressRef.current) {
      console.log(
        '[AI Search] Request already in progress. Ignoring duplicate request.'
      );
      return;
    }

    requestInProgressRef.current = true;

    clearTimers();

    setLoading(true);

    if (setParentLoading) {
      setParentLoading(true);
    }

    setStatusMessage(
      '🤖 Understanding your property requirements...'
    );

    // After a short delay, update status
    timer1Ref.current = setTimeout(() => {
      setStatusMessage(
        '🌐 Agent searching live property portals...'
      );
    }, 1200);

    try {
      console.log(
        '[AI Search] Sending request:',
        trimmed
      );

      const res = await API.post(
        '/ai/agent-search',
        {
          prompt: trimmed
        }
      );

      console.log(
        '[AI Search] Results received:',
        res.data
      );

      if (onSearchResults) {
        onSearchResults(res.data);
      }

    } catch (err) {
      console.error(
        '[AI Search] Error:',
        err
      );

      if (err.response) {
        console.error(
          '[AI Search] Server response:',
          err.response.data
        );
      }

      alert(
        err.response?.data?.message ||
        'Search failed. Please check your backend connection and API key settings.'
      );

    } finally {
      clearTimers();

      setLoading(false);

      if (setParentLoading) {
        setParentLoading(false);
      }

      setStatusMessage('');

      requestInProgressRef.current = false;
    }
  };

  // -----------------------------------------------------------
  // Automatically search when initialQuery is provided
  // -----------------------------------------------------------

  useEffect(() => {
    if (!initialQuery || !initialQuery.trim()) {
      return;
    }

    const trimmedInitialQuery =
      initialQuery.trim();

    // Prevent duplicate automatic searches
    if (
      lastInitialQueryRef.current ===
      trimmedInitialQuery
    ) {
      console.log(
        '[AI Search] Initial query already searched. Skipping.'
      );

      return;
    }

    lastInitialQueryRef.current =
      trimmedInitialQuery;

    setPrompt(trimmedInitialQuery);

    executeSearch(
      trimmedInitialQuery
    );

    return () => {
      clearTimers();
    };
  }, [initialQuery]);

  // -----------------------------------------------------------
  // Manual form submission
  // -----------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    executeSearch(prompt);
  };

  // -----------------------------------------------------------
  // Component cleanup
  // -----------------------------------------------------------

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  // -----------------------------------------------------------
  // UI
  // -----------------------------------------------------------

  return (
    <div className="w-full max-w-3xl mx-auto font-['Outfit',sans-serif]">

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-[#E2DDD4] p-4"
      >

        {/* Label */}
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8945A] mb-2">
          Autonomous AI Property Finder
        </label>

        {/* Prompt */}
        <textarea
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          placeholder="e.g. Find me a 3 bedroom house in Islamabad or Rawalpindi under 2.5 Crore with modern design"
          className="w-full p-2 bg-transparent text-[#18180F] placeholder-[#C5BFB5] focus:outline-none resize-none h-20 text-base"
          disabled={loading}
        />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2 border-t border-[#EDEAE2] pt-3">

          {/* Status */}
          <span className="text-xs text-[#7A7568] italic">
            {loading
              ? statusMessage
              : 'Type your requirement in plain English'}
          </span>

          {/* Button */}
          <button
            type="submit"
            disabled={
              loading ||
              !prompt.trim()
            }
            className="px-6 py-2.5 bg-[#18180F] text-white rounded-xl text-sm font-medium hover:bg-[#B8945A] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading
              ? 'Agent Searching...'
              : 'Search Properties'}
          </button>

        </div>

      </form>

    </div>
  );
}