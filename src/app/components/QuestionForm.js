'use client';

import { useState } from 'react';

export default function QuestionForm() {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [isFormVisible, setIsFormVisible] = useState(false)

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
      // You might want to add some state update logic here to refresh the list
      setIsFormVisible(false)
      window.dispatchEvent(new CustomEvent('refreshQuestions'))
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
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Question title"
            required
          />
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