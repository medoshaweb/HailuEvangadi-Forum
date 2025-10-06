import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";

function QuestionDetail() {
  const { id } = useParams(); // get id from URL
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await API.get(`/questions/${id}`); // matches backend
        setQuestion(res.data);
      } catch (err) {
        console.error("Failed to fetch question detail:", err.response || err);
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question) return <p>Loading question...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{question.question}</h2>
      <p>{question.question_description}</p>
      <small>
        Posted by User {question.user_id} on{" "}
        {new Date(question.created_at).toLocaleString()}
      </small>
    </div>
  );
}

export default QuestionDetail;
