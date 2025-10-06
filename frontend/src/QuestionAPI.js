import axios from "axios";

const QuestionAPI = axios.create({
  baseURL: "http://localhost:5000/api/questions", // ✅ matches backend
});

export default QuestionAPI;
