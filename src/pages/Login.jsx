import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import "../components/styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Successful ✅");

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-page">
        <div className="floating-icon icon1">🎬</div>
<div className="floating-icon icon2">🍿</div>
<div className="floating-icon icon3">⭐</div>
      <div className="auth-card">

        <h1 className="auth-title">
          🎬 Welcome Back
        </h1>

        <p className="auth-subtitle">
          Login to continue your movie journey
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          className="auth-input"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="auth-input"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="auth-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="auth-link">
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;