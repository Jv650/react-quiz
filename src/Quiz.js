// if you want to improve the quiz you can add a components or diff quiz categories and
// add a homepage that allows for the selection

import { QuizContext } from "./context/quiz";
import Question from "./Question";
import React, { useContext, useEffect } from "react";

const Quiz = () => {
  // store all data business logic in a single place and access it from everywhere
  const [quizState, dispatch] = useContext(QuizContext);
  const questionApi = `https://opentdb.com/api.php?amount=10`;
  console.log("quizState", quizState);

  useEffect(() => {
    if (quizState.questions.length > 0 || quizState.error) {
      return;
    }
    console.log("on initialize:", questionApi);
    fetch(questionApi)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        dispatch({ type: "LOADED_QUESTIONS", payload: data.results });
      })
      .catch((err) => {
        console.log("err", err.message);
        dispatch({ type: "SERVER_ERROR", payload: err.results });
      });
  });

  return (
    <div className="quiz">
      {quizState.error && (
        <div className="results">
          <div className="congratulations">Server Error</div>
          <div className="results-info">
            <div>{quizState.error}</div>
          </div>
        </div>
      )}
      {quizState.showResults && (
        <div className="results">
          <div className="congratulations">congratulations</div>
          <div className="results-info">
            <div>You have completed the quiz</div>
            <div>
              You've got {quizState.correctAnswersCount} of{" "}
              {quizState.questions.length}
            </div>
          </div>
          <div
            className="next-button"
            onClick={() => dispatch({ type: "RESTART" })}
          >
            Restart
          </div>
        </div>
      )}
      {!quizState.showResults && quizState.questions.length > 0 && (
        <div>
          <div className="score">
            Question {quizState.currentQuestionIndex + 1}/
            {quizState.questions.length}
          </div>
          <Question />
          <div
            className="next-button"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
          >
            Next Question
          </div>
        </div>
      )}
    </div>
  );
};
export default Quiz;
