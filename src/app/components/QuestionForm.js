'use client';

import { useState } from 'react';

export default function QuestionForm() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

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
      window.dispatchEvent(new CustomEvent('refreshQuestions'))
    }
  }

  return (
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
      <button type="submit">Add Question</button>
    </form>
  );
}