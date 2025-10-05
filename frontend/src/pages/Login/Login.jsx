import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" }); // backend expects email
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form); // match backend route
      localStorage.setItem("token", res.data.token);

      // Optional: fetch protected user info
      const userRes = await API.get("/check", {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });
      setUser(userRes.data);

      navigate("/"); // redirect after login
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <section className="full-screen">
      <main className="main">
        <div className="form-box">
          <h3>Login to your account</h3>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{ color: "#ff6600", cursor: "pointer", fontWeight: 500 }}
            >
              Create one
            </span>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn full">
              Login
            </button>
          </form>
        </div>
      </main>
    </section>
  );
}

export default Login;
