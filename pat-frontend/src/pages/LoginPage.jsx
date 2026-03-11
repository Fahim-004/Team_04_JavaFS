import InputField from "../components/InputField";
import Button from "../components/Button";

import React from "react";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="page">

      <div className="login-box">

        <h2>Login</h2>

        <InputField
  type="email"
  placeholder="Enter email"
/>

<InputField
  type="password"
  placeholder="Enter password"
/>

<Button text="Login"/>

      </div>

    </div>
  );
}

export default LoginPage;