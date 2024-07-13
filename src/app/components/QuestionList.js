'use client'
import { useState, useEffect } from "react";

export default function QuestionList({ initialQuestions }) {
    const [questions, setQuestions] = useState(initialQuestions)
    useEffect(() => {
        const fetchQuestions = async() => {
            const res = await fetch('/api/questions')
            const data = await res.json()
            setQuestions(data)
        }
        const interval = setInterval(fetchQuestions, 5000)
        return () => clearInterval(interval)
    }, [])
    return (
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h3>{question.title}</h3>
            <p>{question.summary}</p>
          </li>
        ))}
      </ul>
    );
  }