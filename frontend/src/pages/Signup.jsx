import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaUser, FaEnvelope, FaLock, FaWallet } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", formData);
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "Signup Failed");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "16px 18px",
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
          "linear-gradient(135deg,#2563eb 0%,#60a5fa 50%,#dbeafe 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "430px",
          background: "rgba(255,255,255,.95)",
          borderRadius: "22px",
          padding: "40px",
          boxShadow: "0 20px 50px rgba(0,0,0,.18)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#2563eb",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              fontSize: 34,
            }}
          >
            <FaWallet />
          </div>

          <h1
            style={{
              marginTop: 20,
              fontSize: 34,
              color: "#1e3a8a",
              fontWeight: "700",
            }}
          >
            Create Account
          </h1>

          <p style={{ color: "#64748b" }}>
            Join FinRelief AI and manage your debt smarter.
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div style={{ position: "relative" }}>
            <FaUser
              style={{
                position: "absolute",
                left: 16,
                top: 18,
                color: "#64748b",
              }}
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={{ ...inputStyle, paddingLeft: 45 }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <FaEnvelope
              style={{
                position: "absolute",
                left: 16,
                top: 18,
                color: "#64748b",
              }}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={{ ...inputStyle, paddingLeft: 45 }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <FaLock
              style={{
                position: "absolute",
                left: 16,
                top: 18,
                color: "#64748b",
              }}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{ ...inputStyle, paddingLeft: 45 }}
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
              marginTop: "10px",
            }}
          >
            🚀 Create Account
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: 25,
            color: "#64748b",
          }}
        >
          Already have an account?

          <Link
            to="/login"
            style={{
              color: "#2563eb",
              fontWeight: "bold",
              marginLeft: 6,
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;