import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

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

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-5 mt-8">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Signup
          </button>

        </form>

        <p className="text-center mt-5">
          Already have an account?

          <Link
            to="/login"
            className="text-blue-700 ml-2"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}

export default Signup;