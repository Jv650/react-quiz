import { createContext, useReducer } from "react";
import { normalizeQuestions, shuffleAnswers } from "../helpers";

// async function getQuestionsApi() {
//   try {
//     const response = await fetch(`https://opentdb.com/api.php?amount=10`);
//     const data = await response.json();
//     apiQuestions = data.results;
//     console.log(questions);
//     displayQuestions(apiQuestions);
//   } catch (error) {
//     console.error("Error fetching results:", error);
//   }
// }
// getQuestionsApi();

// this state is what we had at the beginning of quiz so - 0 questions
const initialState = {
  currentQuestionIndex: 0,
  questions: [],
  showResults: false,
  answers: [], //by default it will return the first question hence index 0
  currentAnswer: "",
  correctAnswersCount: 0,
  error: null,
};

const reducer = (state, action) => {
  console.log("reducer", state, action);
  switch (action.type) {
    case "SELECT_ANSWER": {
      const correctAnswersCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswersCount + 1
          : state.correctAnswersCount;
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount,
      };
    }
    case "NEXT_QUESTION": {
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);
      return {
        ...state,
        showResults,
        answers,
        currentQuestionIndex,
        currentAnswer: "", //allows for the question to be highlighted until its clicked
      };
    }
    case "RESTART": {
      return initialState; //will take us to the initial state
    }
    case "LOADED_QUESTIONS": {
      const normalizedQuestions = normalizeQuestions(action.payload);
      return {
        ...state,
        questions: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0]),
      };
    }
    case "SERVER_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  console.log("state", value);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
