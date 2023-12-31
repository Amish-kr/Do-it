import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (name.trim() === "") {
      hasError = true;
    }

    if (email.trim() === "") {
      hasError = true;
    }

    if (password.trim() === "") {
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        alert("User not created");
        // Handle error case here
      }
    } catch (error) {
      console.log("Error occurred:", error);
      // Handle error case here
    }
    setName("");
    setEmail("");
    setPassword("");
    console.log("registered");
  };

  return (
    <div className="login-page">
      <div className="left-section"></div>

      <div className="right-section">
        <h2 className="right">Signup</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            placeholder="name"
            value={name}
            onChange={handleNameChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button type="submit">Create Account</button>
          <br />
          <div className="Account">
            Already have an account?
            <Link to="/">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
