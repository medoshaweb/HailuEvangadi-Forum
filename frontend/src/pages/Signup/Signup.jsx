import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Signup.css"

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <section className="signup">
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Join the network</h2>
      <p>
        Already have an account? <a href="/login">Sign In</a>
      </p>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <div className="name-row">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <input
        type="text"
        name="username"
        placeholder="User Name"
        value={form.username}
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
      <button type="submit" className="join-btn">Agree and Join</button>
        <p className="policy">
          I agree to the <a href="/">privacy policy</a> and <a href="/">terms of service</a>.
        </p>
        <p><a href="/login">Already have an account?</a></p>
      </form>

      <aside className="signup-info">
        <h3>Evangadi Networks Q&A</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <button className="how-btn">HOW IT WORKS</button>
      </aside>
    </section>
  );
};

export default Signup;