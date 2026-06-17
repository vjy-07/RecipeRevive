import React, { useState } from "react";
import axios from "axios";
import "../../styles/Auth.scss";

axios.defaults.baseURL = "https://reicperevive.onrender.com";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    // Validation checks
    setMessage("");

    if (!name.trim()) {
      setMessage("Name is required");
      return;
    }

    if (name.trim().length < 3) {
      setMessage("Name must be at least 3 characters");
      return;
    }

    const nameRegex = /^[A-Za-z ]+$/;

    if (!nameRegex.test(name)) {
      setMessage("Name can contain only letters and spaces");
      return;
    }

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

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

    if (!passwordRegex.test(password)) {
      setMessage(
        "Password must contain uppercase, lowercase, number and special character",
      );
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      console.log("Signup successful", response.data);
      setMessage("Signup successful!"); // Success message
    } catch (error) {
      console.error("Signup failed", error);

      // Improved error handling
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Signup failed. Please try again.";
        if (errorMessage === "User already exists") {
          setMessage("User already exists"); // Specific error message for duplicate email
        } else {
          setMessage(errorMessage); // Show specific backend error message
        }
      } else {
        setMessage("Signup failed. Please try again."); // Fallback error message
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Signup</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setMessage("");
           }
          }
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setMessage("");
          }}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setMessage("");
          }}
          placeholder="Password"
        />
        <button onClick={handleSignup}>Signup</button>
        {message && <div className="auth-message">{message}</div>}
      </div>
    </div>
  );
};

export default Signup;
