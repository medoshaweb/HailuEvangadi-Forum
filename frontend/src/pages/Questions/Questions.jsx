import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { QuestionContext } from "../../context/QuestionContext";

function Questions() {
  const { user } = useContext(AuthContext);
  const { questions } = useContext(QuestionContext); // use global questions

  return (
    <div>
      <h2>Welcome {user?.username || "Guest"}</h2>
      {user && <Link to="/ask">Ask Question</Link>}

      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q.question_id}>
              <Link to={`/question/${q.question_id}`}>{q.question}</Link> (by
              User {q.user_id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Questions;
