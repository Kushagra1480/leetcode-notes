import QuestionForm from '@/app/components/QuestionForm';
import QuestionList from '@/app/components/QuestionList';

async function getQuestions() {
  const res = await fetch('http://localhost:3000/api/questions', { cache: 'no-store' });
  return res.json();
}

export default async function Home() {
  const questions = await getQuestions();

  return (
    <div className="container">
      <h1>LeetCode Question Summary</h1>
      <QuestionForm />
      <QuestionList initialQuestions={questions} />
    </div>
  );
}