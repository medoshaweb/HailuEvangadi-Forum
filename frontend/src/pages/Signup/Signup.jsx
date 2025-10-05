import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  //  Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("Signup successful! Please login.");
      navigate("/login"); // Go to login page
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="full-screen">
      <main className="main">
        {/* Form Section */}
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <h3>Join the network</h3>
            <p>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{ color: "#ff6600", cursor: "pointer", fontWeight: 500 }}
              >
                Sign in
              </span>
            </p>

            <input
              style={{ backgroundColor: "#e8f0fe" }}
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
                name="firstname"
                placeholder="First Name"
                value={form.firstname}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={form.lastname}
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
              style={{ backgroundColor: "#e8f0fe" }}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <div className="checkbox-row">
              <input type="checkbox" id="agree" name="agree" required />
              <label htmlFor="agree">
                I agree to the <a href="#">privacy policy</a> and{" "}
                <a href="#">terms of service</a>
              </label>
            </div>

            <button type="submit" className="btn full">
              Agree and Join
            </button>
            <a href="#">Already have a account</a>
          </form>
        </div>

        {/* About Section */}
        <div className="about">
          <a href="#" className="about-link">
            About
          </a>

          <p className="about-topic">Evangadi Networks</p>

          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>

          <br />

          <p>
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>

          <a href="#" className="btn orange">
            HOW IT WORKS
          </a>
        </div>
      </main>
    </section>
  );
};

export default Signup;
