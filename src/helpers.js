export const shuffleAnswers = (question) => {
  const unshuffledAnswers = [
    question.correctAnswer,
    ...question.incorrectAnswers,
  ];

  return unshuffledAnswers // we have an arr of strings
    .map((unshuffledAnswer) => ({
      //convert it to an arr of objets to generate our sort with math.random
      sort: Math.random(),
      value: unshuffledAnswer,
    }))
    .sort((a, b) => a.sort - b.sort) // sorting the arr of objects by math.random
    .map((a) => a.value); // we are reading our values back
  // this will shuffle all our string inside the arr
};

export const normalizeQuestions = (backendQuestions) => {
  return backendQuestions.map((backendQuestion) => {
    const incorrectAnswers = backendQuestion.incorrect_answers.map(
      (incorrectAnswer) => decodeURIComponent(incorrectAnswer)
    );
    return {
      correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
      question: decodeURIComponent(backendQuestion.question),
      incorrectAnswers,
    };
  });
};
