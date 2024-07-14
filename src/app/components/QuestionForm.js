'use client';

import { useState, useEffect, useRef } from 'react';

export default function QuestionForm() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function handleTitleChange(e) {
    const value = e.target.value;
    setTitle(value);

    if (value.length > 0) {
      try {
        const res = await fetch(`/api/leetcode-search?keyword=${encodeURIComponent(value)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data);
        } else {
          console.error('Failed to fetch suggestions');
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  }

  function handleSuggestionClick(suggestion) {
    setTitle(suggestion.title);
    setSuggestions([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, summary }),
    });
    if (res.ok) {
      setTitle('');
      setSummary('');
      setIsFormVisible(false);
      window.dispatchEvent(new CustomEvent('refreshQuestions'));
    }
  }

  return (
    <div className="question-form-container">
      {!isFormVisible && (
        <button 
          className="add-question-button"
          onClick={() => setIsFormVisible(true)}
        >
          +
        </button>
      )}
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Question title"
              required
            />
            {suggestions.length > 0 && (
              <ul className="suggestions" ref={suggestionsRef}>
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion.title} - {suggestion.difficulty}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="One-line solution/summary"
            required
          />
          <div className="form-buttons">
            <button type="submit">Add Question</button>
            <button type="button" onClick={() => setIsFormVisible(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}