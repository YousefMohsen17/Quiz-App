import logo from "../assets/quiz-complete.png";
import Questions from "../questions.js";

export default function Summary({ userAnswer }) {
  const skipped = userAnswer.filter((arr) => arr === "Skipped");
  const correct = userAnswer.filter(
    (ans, index) => ans === Questions[index].correct
  );
  const incorrect = userAnswer.filter(
    (ans, index) => ans !== Questions[index].correct && ans !== "Skipped"
  );
  return (
    <div id="summary">
      <img src={logo} alt="" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">
            {Math.round((skipped.length / Questions.length) * 100)}%
          </span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">
            {Math.round((correct.length / Questions.length) * 100)}%
          </span>
          <span className="text">Answered Correctly</span>
        </p>
        <p>
          <span className="number">
            {Math.round((incorrect.length / Questions.length) * 100)}%
          </span>
          <span className="text">Answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {Questions.map((que, index) => {
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{que.text}</p>
              <p
                className={` ${
                  que.correct === userAnswer[index]
                    ? "correct"
                    : userAnswer[index] === "Skipped"
                    ? "skipped"
                    : "wrong"
                } user-answer`}
              >
                {userAnswer[index]}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
