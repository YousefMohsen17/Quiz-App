import { useState, useEffect } from "react";
import Questions from "../questions.js";
export default function Answer({
  index,
  userAnswer,
  showAnswer,
  selectedIndex,
  onAnswer,
}) {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const currentQuestion = Questions[index];

  function shuffle(array) {
    const copy = [...array];
    let currentIndex = copy.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [copy[currentIndex], copy[randomIndex]] = [
        copy[randomIndex],
        copy[currentIndex],
      ];
    }
    return copy;
  }
  useEffect(() => {
    if (userAnswer.length === Questions.length) return;
    setShuffledAnswers(shuffle(currentQuestion.answers));
  }, [index]);
  return (
    <>
      <h2>{currentQuestion.text}</h2>
      <ul id="answers">
        {shuffledAnswers.map((ans, index) => {
          let className;
          if (showAnswer === "show" && selectedIndex === index) {
            className = ans === currentQuestion.correct ? "correct" : "wrong";
          }

          return (
            <li key={index} className="answer">
              <button
                disabled={showAnswer === "" ? false : true}
                onClick={() => onAnswer(ans, index)}
                className={`${
                  selectedIndex === index && showAnswer === "wait"
                    ? "selected"
                    : ""
                } ${className}`}
              >
                {shuffledAnswers[index]}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
