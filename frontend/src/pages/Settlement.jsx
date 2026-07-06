import { useState } from "react";
import axios from "axios";
import {
  FaUniversity,
  FaCalculator,
  FaChartPie,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaPiggyBank,
  FaRobot,
} from "react-icons/fa";

const API = "http://127.0.0.1:8000";

function Settlement() {
  const [form, setForm] = useState({
    lender_name: "",
    loan_type: "",
    outstanding_amount: "",
    emi: "",
    overdue_months: "",
    monthly_income: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const calculate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/settlement/recommend`, {
        lender_name: form.lender_name,
        loan_type: form.loan_type,
        outstanding_amount: Number(form.outstanding_amount),
        emi: Number(form.emi),
        overdue_months: Number(form.overdue_months),
        monthly_income: Number(form.monthly_income),
      });
console.log("Backend Response:", res.data);
      console.log("Form:", form);
console.log("Response:", res.data);
setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to calculate settlement.");
    }
  };

 return (
  <div className="min-h-screen bg-slate-100 py-10">

    <div className="max-w-7xl mx-auto px-8">

      <h1 className="text-4xl font-bold text-slate-800 mb-3">
        🤖 AI Settlement Recommendation
      </h1>

      <p className="text-gray-500 mb-10">
        Get an AI-powered recommendation for your debt settlement using AI.
      </p>

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
          <FaUniversity className="text-blue-600" />
          Loan Details
        </h2>

        <form
          onSubmit={calculate}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <input
  type="text"
  name="lender_name"
  placeholder="🏦 Bank Name"
  value={form.lender_name}
  onChange={handleChange}
  required
  className="w-full rounded-xl border border-slate-300 px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
/>

<input
  type="text"
  name="loan_type"
  placeholder="📄 Loan Type"
  value={form.loan_type}
  onChange={handleChange}
  required
  className="w-full rounded-xl border border-slate-300 px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
/>

<input
  type="number"
  name="outstanding_amount"
  placeholder="💰 Outstanding Amount"
  value={form.outstanding_amount}
  onChange={handleChange}
  required
  className="w-full rounded-xl border border-slate-300 px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
/>

<input
  type="number"
  name="emi"
  placeholder="💳 Monthly EMI"
  value={form.emi}
  onChange={handleChange}
  required
  className="w-full rounded-xl border border-slate-300 px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
/>

<input
  type="number"
  name="overdue_months"
  placeholder="📅 Overdue Months"
  value={form.overdue_months}
  onChange={handleChange}
  required
  className="w-full rounded-xl border border-slate-300 px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
/>

<input
  type="number"
  name="monthly_income"
  placeholder="💵 Monthly Income"
  value={form.monthly_income}
  onChange={handleChange}
  required
  className="w-full rounded-xl border border-slate-300 px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
/>

<button
  type="submit"
  className="xl:col-span-3 md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"
>
  <FaCalculator className="inline mr-2" />
  Calculate Recommendation
</button>
        </form>

</div>

{result && (

<div className="mt-10">

  <h2 className="text-3xl font-bold text-slate-800 mb-8">
    💡 AI Recommendation
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">

  {/* Recommended Settlement */}
<div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">
  <FaMoneyBillWave className="text-5xl text-green-600 mb-5" />
  <p className="text-gray-500">Recommended Settlement</p>
  <h2 className="text-4xl font-bold text-green-600 mt-3">
    ₹{result.recommended_settlement.toLocaleString()}
  </h2>
</div>

{/* Settlement Percentage */}
<div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">
  <FaChartPie className="text-5xl text-blue-600 mb-5" />
  <p className="text-gray-500">Settlement Percentage</p>
  <h2 className="text-4xl font-bold text-blue-600 mt-3">
    {result.settlement_percentage}%
  </h2>
</div>

{/* Debt Stress */}
<div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">
  <FaExclamationTriangle
    className={`text-5xl mb-5 ${
      result.debt_stress === "High"
        ? "text-red-600"
        : result.debt_stress === "Medium"
        ? "text-yellow-500"
        : "text-green-600"
    }`}
  />
  <p className="text-gray-500">Debt Stress</p>
  <h2
    className={`text-4xl font-bold mt-3 ${
      result.debt_stress === "High"
        ? "text-red-600"
        : result.debt_stress === "Medium"
        ? "text-yellow-500"
        : "text-green-600"
    }`}
  >
    {result.debt_stress}
  </h2>
</div>

{/* Savings */}
<div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">
  <FaPiggyBank className="text-5xl text-pink-600 mb-5" />
  <p className="text-gray-500">Savings</p>
  <h2 className="text-4xl font-bold text-pink-600 mt-3">
    ₹{result.savings.toLocaleString()}
  </h2>
</div>

{/* AI Advice */}
<div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">
  <FaRobot className="text-5xl text-indigo-600 mb-5" />
  <p className="text-gray-500">AI Advice</p>
  <p className="text-lg font-semibold text-indigo-600 mt-3">
    {result.advice}
  </p>
</div>

</div>
<div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

  <h2 className="text-2xl font-bold mb-6">
    📊 Loan Analysis
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    <div>

      <p className="text-gray-500">
        EMI Ratio
      </p>

      <h3 className="text-3xl font-bold text-blue-600 mt-2">
        {result.emi_ratio}%
      </h3>

    </div>

    <div>

      <p className="text-gray-500">
        Overdue Months
      </p>

      <h3 className="text-3xl font-bold text-red-600 mt-2">
        {result.overdue_months}
      </h3>

    </div>

  </div>

  <div className="mt-8">

    <div className="flex justify-between mb-2">

      <span className="font-medium">
        Recommended Settlement
      </span>

      <span className="font-bold text-green-600">
        {result.settlement_percentage}%
      </span>

    </div>

    <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">

      <div
        className="h-full bg-green-600 rounded-full transition-all duration-700"
        style={{
          width: `${result.settlement_percentage}%`,
        }}
      />

    </div>

  </div>

  <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-6">

    <h3 className="text-xl font-bold mb-4">
      🤖 AI Summary
    </h3>

    <p className="text-gray-700 leading-8">
      Based on your income, EMI and overdue history, the AI recommends
      settling approximately
      <span className="font-bold text-green-600">
        {" "}₹{result.recommended_settlement.toLocaleString()}{" "}
      </span>
      which is
      <span className="font-bold text-blue-600">
        {" "}{result.settlement_percentage}%{" "}
      </span>
      of your outstanding loan. Your current debt stress level is
      <span className="font-bold">
        {" "}{result.debt_stress}
      </span>.
    </p>

  </div>

</div>
</div>

)}

</div>

</div>

);
}

export default Settlement;




      