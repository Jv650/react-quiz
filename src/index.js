import React from "react";
import ReactDOM from "react-dom/client";
import Quiz from "./Quiz";
import "./index.css";
import { QuizProvider } from "./context/quiz";

// ReactDOM.createRoot -> markup & document.getElementById("root") -> is the element inside the react app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QuizProvider>
    <Quiz />
  </QuizProvider>
);
