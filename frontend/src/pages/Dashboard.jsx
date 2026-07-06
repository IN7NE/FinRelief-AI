import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaMoneyBillWave,
  FaUniversity,
  FaRobot,
  FaFileInvoiceDollar,
} from "react-icons/fa";
const API = "http://127.0.0.1:8000";
function Dashboard() {
    const [summary, setSummary] = useState({
  total_loans: 0,
  active_loans: 0,
  total_outstanding: 0,
  total_emi: 0,
  total_income: 0,
  recent_loan: null,
});
const chartData = [
  {
    name: "Outstanding",
    Amount: summary.total_outstanding,
  },
  {
    name: "Monthly EMI",
    Amount: summary.total_emi,
  },
];
useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const res = await axios.get(`${API}/loans/summary/dashboard`);
    setSummary(res.data);
  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

     <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-700 to-indigo-700 shadow-xl">

        <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

         <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
  <span className="text-4xl">💰</span>
  FinRelief AI
</h1>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl transition"
          >
            Logout
          </button>

        </div>

      </nav>

     <div className="w-full max-w-screen-2xl mx-auto px-12 py-10">

        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mb-10">
          Monitor your financial health with AI-powered insights.
        </p>

        {/* Stats */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100"
          >
            <FaUniversity className="text-5xl text-blue-600 mb-5" />

            <h4 className="text-gray-500">Total Loans</h4>
<h2 className="text-5xl font-extrabold mt-3 text-slate-900">
  {summary.total_loans}
</h2>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
          >
           <FaMoneyBillWave className="text-5xl text-green-600 mb-5" />

            <h4 className="text-gray-500">Monthly EMI</h4>

            <h2 className="text-5xl font-extrabold mt-3 text-slate-900">
  ₹{summary.total_emi.toLocaleString()}
</h2>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
          >
            <FaFileInvoiceDollar className="text-5xl text-orange-500 mb-5" />

            <h4 className="text-gray-500">
              Outstanding
            </h4>

            <h2 className="text-5xl font-extrabold mt-3 text-slate-900">
  ₹{summary.total_outstanding.toLocaleString()}
</h2>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
          >
            <FaRobot className="text-5xl text-purple-600 mb-5" />

            <h4 className="text-gray-500">
              AI Risk
            </h4>

            <span className="inline-block mt-3 bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
              Medium
            </span>
          </motion.div>

        </div>

        {/* Quick Actions */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <Link
              to="/loans"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold">
                📋 Manage Loans
              </h3>

              <p className="mt-3 opacity-90">
                Add, update or delete your loans.
              </p>
            </Link>

            <Link
              to="/settlement"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold">
                💡 Settlement
              </h3>

              <p className="mt-3 opacity-90">
                AI recommends the best settlement amount.
              </p>
            </Link>

            <Link
              to="/negotiation"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold">
                🤖 AI Negotiation
              </h3>

              <p className="mt-3 opacity-90">
                Negotiate directly with the AI bank officer.
              </p>
            </Link>

          </div>

        </div>

        {/* Recent Loan */}

        <div className="bg-white rounded-3xl shadow-xl mt-12 p-10 hover:shadow-2xl transition-all duration-300">

         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

            <div>

              <h2 className="text-3xl font-bold">
              🏦 {summary.recent_loan?.bank || "No Loans"}
              </h2>

              <p className="text-gray-500 mt-2">
                {summary.recent_loan?.loan_type || ""}
              </p>

            </div>

<span className="self-start md:self-auto bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">
  {summary.recent_loan?.status || "N/A"}
</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">

            <div>

              <p className="text-gray-500">
                Outstanding
              </p>

              <h3 className="text-2xl font-bold">
              ₹{summary.recent_loan?.outstanding?.toLocaleString() || 0}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                EMI
              </p>

              <h3 className="text-2xl font-bold">
                ₹{summary.recent_loan?.emi?.toLocaleString() || 0}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Overdue
              </p>

              <h3 className="text-2xl font-bold text-red-600">
            {summary.recent_loan?.overdue || 0} Months
              </h3>

            </div>

                   </div>

                </div>

                {/* 📊 Financial Overview Chart */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-12">

          <h2 className="text-3xl font-bold mb-8">
            📊 Financial Overview
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="Amount"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>
</div>

  );
}

export default Dashboard;