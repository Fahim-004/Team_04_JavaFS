import InputField from "../components/InputField";
import Button from "../components/Button";
import React, { useState } from "react";

function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      alert("Registration successful");

    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="page">

      <div className="login-box">

        <h2>Register</h2>

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

        <Button text="Register" onClick={handleRegister} />

      </div>

    </div>
  );
}

export default RegisterPage;