// src/pages/Questions/QuestionList.jsx
import { useContext } from "react";
import { QuestionContext } from "../../../context/QuestionContext";

function QuestionList() {
  const { questions } = useContext(QuestionContext);

  return (
    <div>
      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q.question_id}>
              {q.question} (by User {q.user_id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionList;
