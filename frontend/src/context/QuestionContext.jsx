import { createContext, useState, useEffect } from "react";
import QuestionAPI from "../QuestionAPI";

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  // Fetch all questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await QuestionAPI.get("/");
        setQuestions(res.data);
      } catch (err) {
        console.error("Failed to fetch questions:", err?.response || err);
      }
    };
    fetchQuestions();
  }, []);

  // Function to add a new question
  const addQuestion = (question) => {
    setQuestions((prev) => [question, ...prev]);
  };

  return (
    <QuestionContext.Provider value={{ questions, addQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
};
