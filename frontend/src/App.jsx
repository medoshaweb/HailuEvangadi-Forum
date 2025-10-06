import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QuestionProvider } from "../src/context/QuestionContext";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import QuestionDetail from "./pages/QuestionDetail/QuestionDetail";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuestionProvider>
          <Routes>
            <Route path="/" element={<Questions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ask" element={<AskQuestion />} />
            <Route path="/question/:id" element={<QuestionDetail />} />
          </Routes>
        </QuestionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
