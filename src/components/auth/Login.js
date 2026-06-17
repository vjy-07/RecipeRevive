import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.scss";

axios.defaults.baseURL = "https://reicperevive.onrender.com";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setMessage("");

    if (!email.trim()) {
      setMessage("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    if (!password) {
      setMessage("Password is required");
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      onLogin(token);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);

      if (error.response?.data?.msg) {
        setMessage(error.response.data.msg);
      } else {
        setMessage("Invalid email or password");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage("");
          }}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setMessage("");
          }}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
        {message && <div className="auth-message">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
