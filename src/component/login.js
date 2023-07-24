import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post("https://khrisna-be.vercel.app/login", loginData);
      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem("token", token);

      // Reset the form fields
      setUsername("");
      setPassword("");

      // Show success alert
      window.alert("Login successful!");

      // Navigate to the "/" route
      navigate("/");
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle login error

      // Show error alert
      window.alert("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
