import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Login.css";
import Cookies from "js-cookie";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("user", JSON.stringify(user));
        Cookies.set("token", token, { expires: 7 });

        navigate("/admin/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Invalid email or password");
      console.error(error);
    }
  };

  return (
    <>
    <div className="container">
      <div id="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
              {error}
            </div>
          )}
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
    <div className="footer">
  <h4>
    Powered by{" "}
    <a href="https://qtech.com.jo" target="_blank" rel="noopener noreferrer">
      Qtech
    </a>
  </h4>
</div>

    </>
  );
}

export default LoginForm;

