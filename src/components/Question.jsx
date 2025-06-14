import { useState, useRef, useCallback } from "react";
import Questions from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import Summary from "./Summary.jsx";
import Answer from "./Answer.jsx";
export default function Question() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [showAnswer, setShowAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState([]);
  const quizIsComplete = userAnswer.length === Questions.length;
  let timer = useRef(5000);
  const handleSkipAnswer = useCallback(() => {
    if (quizIsComplete) return;
    setUserAnswer((prev) => [...prev, "Skipped"]);
    setCurrentQuestionIndex((prev) => prev + 1);
    setShowAnswer("");
    setSelectedIndex("");
  }, [quizIsComplete]);

  const handleAnswer = useCallback(
    (ans, index) => {
      setSelectedIndex(index);
      setShowAnswer("wait");
      timer.current = 1000;
      setTimeout(() => {
        setShowAnswer("show");
        timer.current = 1000;
        setTimeout(() => {
          setUserAnswer((prev) => [...prev, ans]);
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedIndex("");
          setShowAnswer("");
          timer.current = 5000;
        }, 1000);
      }, 1000);
    },
    [timer]
  );

  return !quizIsComplete ? (
    <>
      <QuestionTimer
        key={`${currentQuestionIndex}-${showAnswer}`}
        selectedIndex={selectedIndex}
        timeout={timer.current}
        onTimeOut={handleSkipAnswer}
        onSelect={handleAnswer}
        answerState={showAnswer}
      />
      <Answer
        index={currentQuestionIndex}
        userAnswer={userAnswer}
        showAnswer={showAnswer}
        selectedIndex={selectedIndex}
        onAnswer={handleAnswer}
      />
    </>
  ) : (
    <Summary answerState={showAnswer} userAnswer={userAnswer} />
  );
}
