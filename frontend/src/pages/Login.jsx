import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          FinRelief AI
        </h1>

        <p className="text-center text-gray-500 mt-2">
          AI Powered Debt Relief & Financial Recovery Platform
        </p>

      <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
<button
  type="submit"
  className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition"
>
  Login
</button>

        </form>

        <p className="text-center mt-6">

          Don't have an account?

          <Link
            to="/signup"
            className="text-blue-600 ml-2 font-semibold"
          >
            Signup
          </Link>

        </p>

      </div>
    </div>
  );
}

export default Login;