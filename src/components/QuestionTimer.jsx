import { useEffect, useState } from "react";

export default function QuestionTimer({
  selectedIndex,
  timeout,
  onTimeOut,
  answerState,
}) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setRemainingTime(timeout);
  }, [timeout]);

  useEffect(() => {
    if (selectedIndex !== "") return;
    const timer = setTimeout(onTimeOut, timeout);
    return () => clearTimeout(timer);
  }, [selectedIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevtime) => prevtime - 10);
    }, 10);
    return () => clearInterval(interval);
  }, []);
  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={`${answerState === "wait" ? "answered" : ""}`}
    ></progress>
  );
}
