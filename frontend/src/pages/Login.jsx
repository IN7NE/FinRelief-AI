import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  FaEnvelope,
  FaLock,
  FaWallet,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.detail || "Login Failed");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "16px 18px",
    paddingLeft: "48px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#2563eb,#60a5fa,#dbeafe)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "430px",
          background: "#fff",
          borderRadius: "22px",
          padding: "40px",
          boxShadow: "0 20px 50px rgba(0,0,0,.18)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#2563eb",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              fontSize: "34px",
            }}
          >
            <FaWallet />
          </div>

          <h1
            style={{
              fontSize: "34px",
              marginTop: "20px",
              color: "#1e3a8a",
            }}
          >
            Welcome Back
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: "8px",
            }}
          >
            Sign in to your FinRelief AI account
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            marginTop: "30px",
          }}
        >
          <div style={{ position: "relative" }}>
            <FaEnvelope
              style={{
                position: "absolute",
                left: "16px",
                top: "18px",
                color: "#64748b",
              }}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ position: "relative" }}>
            <FaLock
              style={{
                position: "absolute",
                left: "16px",
                top: "18px",
                color: "#64748b",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "16px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "8px",
            }}
          >
            🔐 Login
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
            color: "#64748b",
          }}
        >
          Don't have an account?

          <Link
            to="/signup"
            style={{
              color: "#2563eb",
              fontWeight: "bold",
              marginLeft: "6px",
              textDecoration: "none",
            }}
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;