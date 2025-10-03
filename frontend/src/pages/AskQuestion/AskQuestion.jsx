import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AskQuestion() {
  const [form, setForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/question", form);
      navigate("/");
    } catch (err) {
      alert("Failed to post question");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Ask a Question</h3>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <textarea
        name="description"
        placeholder="Describe your problem"
        onChange={handleChange}
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default AskQuestion;
