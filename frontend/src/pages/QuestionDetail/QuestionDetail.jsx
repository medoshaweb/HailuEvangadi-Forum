import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";

function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    API.get("/question").then((res) => {
      const q = res.data.find((q) => q.id == id);
      setQuestion(q);
    });
    API.get(`/answer/${id}`).then((res) => setAnswers(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/answer", { questionId: id, content });
      setAnswers([{ content, username: "You" }, ...answers]);
      setContent("");
    } catch (err) {
      alert("Failed to post answer");
    }
  };

  return (
    <div>
      <h2>{question?.title}</h2>
      <p>{question?.description}</p>

      <h3>Answers</h3>
      {answers.map((a, i) => (
        <div key={i}>
          <b>{a.username}:</b> {a.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Post Answer</button>
      </form>
    </div>
  );
}

export default QuestionDetail;
