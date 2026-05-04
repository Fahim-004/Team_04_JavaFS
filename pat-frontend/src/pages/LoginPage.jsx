import InputField from "../components/InputField";
import Button from "../components/Button";

import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import "./LoginPage.css";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      login(data.token);

      console.log("Login success");

    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="page">

      <div className="login-box">

        

        <h2>Login</h2>

        <InputField
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button text="Login" onClick={handleLogin} />

        <p className="forgot">Forgot Password?</p>

        <p className="signup">
            Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>
  );
}

export default LoginPage;