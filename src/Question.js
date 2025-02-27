import { useContext } from "react";
import { QuizContext } from "./context/quiz";
import Answer from "./Answer";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const currentQues = quizState.questions[quizState.currentQuestionIndex];
  console.log("Questions:", quizState);
  console.log("currentQuestion", currentQues);
  return (
    <div>
      <div className="question">{currentQues.question}</div>
      <div className="answers">
        {quizState.answers.map(
          (
            answer,
            index // the key will hold the index number of current answer
          ) => (
            <Answer
              answerText={answer}
              key={index}
              index={index}
              currentAnswer={quizState.currentAnswer}
              correctAnswer={currentQues.correctAnswer}
              onSelectAnswer={(answerText) =>
                dispatch({ type: "SELECT_ANSWER", payload: answerText })
              }
            />
          )
        )}
      </div>
    </div>
  );
};
export default Question;
