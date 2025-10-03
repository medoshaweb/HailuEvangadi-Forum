import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../context/AuthContext";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get("/question").then((res) => setQuestions(res.data));
  }, []);

  return (
    <div>
      <h2>Welcome {user?.username || "Guest"}</h2>
      {user && <Link to="/ask">Ask a Question</Link>}
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <Link to={`/question/${q.id}`}>{q.title}</Link> (by {q.username})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;
