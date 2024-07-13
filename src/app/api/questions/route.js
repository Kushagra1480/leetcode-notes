import { NextResponse } from 'next/server';
import { getQuestions, addQuestion } from '@/app/lib/db';

export async function GET() {
  const questions = await getQuestions();
  return NextResponse.json(questions);
}

export async function POST(request) {
  const question = await request.json();
  const newQuestion = await addQuestion(question);
  return NextResponse.json(newQuestion, { status: 201 });
}