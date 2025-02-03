import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Correct usage of useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      // Send login request to the backend
      const response = await axios.post("http://127.0.0.1:8000/token/", {
        username,
        password,
      });

      localStorage.setItem("access_token",response.data.access);
      localStorage.setItem("refresh_token",response.data.refresh);

      // On successful login
      setSuccess("Login successful!");
      setError("");
      const accessToken = response.data.access; // Assuming 'access' is the token key
      localStorage.setItem("access_token", accessToken); // Store token for later use

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.error(error);
      setSuccess("");
      setError(
        error.response?.data?.detail || "Invalid username or password. Please try again."
      ); // Adjust error message based on backend response
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded">
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
