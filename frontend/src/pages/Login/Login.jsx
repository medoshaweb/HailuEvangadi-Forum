// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api";
// import { AuthContext } from "../../context/AuthContext";
// import "./Login.css"

// function Login() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const { setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/user/login", form);
//       localStorage.setItem("token", res.data.token);

//       const userRes = await API.get("/user/checkUser");
//       setUser(userRes.data);

//       navigate("/");
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="username" placeholder="Username" onChange={handleChange} />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         onChange={handleChange}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css"
// import { login } from "../../../../backend/controllers/userController";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", form);
      localStorage.setItem("token", res.data.token);

      const userRes = await API.get("/user/checkUser");
      setUser(userRes.data);

      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };


  return (
    <section className="full-screen">
      <main className="main">
        {/* Form Section */}
        <div className="form-box">
          <h3>Login to your account</h3>
          <p>
            Don't have an account? <a href="/signup">Create a new account</a>
              
            
            <span
              onClick={() => navigate("/login")}
              style={{ color: "#ff6600", cursor: "pointer", fontWeight: 500 }}
            >
              Sign in
            </span>
          </p>

          <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
     <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>

            <div className="checkbox-row">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="#">privacy policy</a> and{" "}
                <a href="#">terms of service</a>
              </label>
            </div>

            <button type="submit" className="btn full">
              Agree and Join
            </button>
          
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

export default Login;
