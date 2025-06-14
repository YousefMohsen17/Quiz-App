import Questions from "../questions.js";
import Question from "./Question.jsx";
export default function Quiz() {
  return (
    <main>
      <div id="quiz">
        <div id="question">
          <Question />
        </div>
      </div>
    </main>
  );
}
