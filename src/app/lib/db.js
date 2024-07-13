let questions = [];
let id = 0;

export async function getQuestions() {
  return questions;
}

export async function addQuestion(question) {
  const newQuestion = { id: ++id, ...question };
  questions.push(newQuestion);
  return newQuestion;
}