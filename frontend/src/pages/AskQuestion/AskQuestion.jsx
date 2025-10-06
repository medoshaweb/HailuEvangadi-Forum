import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../QuestionAPI";
import { AuthContext } from "../../context/AuthContext";
import QuestionList from "../Questions/QuestionList/QuestionList";
// import QuestionDetail from "../QuestionDetail/QuestionDetail";

function AskQuestion() {
  const { user } = useContext(AuthContext); // get logged-in user
  const [form, setForm] = useState({ question: "", question_description: "" });
  const [loading, setLoading] = useState(false); // optional loading state
  const [newQuestion, setNewQuestion] = useState(null); // store the new question
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to post a question");
      return;
    }

    setLoading(true);
    try {
      // Attach the user_id dynamically from AuthContext
      const payload = { ...form, user_id: user.user_id };

      const res = await API.post("/", payload);
      console.log("Created question:", res.data.question);
      // You can now update state to show it in the question list

      // store the created question
      setNewQuestion(res.data);

      alert("Question posted successfully!"); // optional success message
      setForm({ question: "", question_description: "" }); // clear form
      navigate("/"); // go back to home after posting
    } catch (err) {
      console.error(err?.response || err);
      alert(
        err?.response?.data?.message || "Failed to post question. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Ask Question</h3>
        <input
          name="question"
          placeholder="Title"
          value={form.question}
          onChange={handleChange}
          required
        />
        <textarea
          name="question_description"
          placeholder="Describe your problem"
          value={form.question_description}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
      {/* Show question list and pass the new question */}
      <QuestionList newQuestion={newQuestion} />
    </div>
  );
}

export default AskQuestion;
