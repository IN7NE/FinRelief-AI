import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import {
  FaUniversity,
  FaTrash,
  FaPlusCircle,
  FaFileInvoiceDollar,
  FaComments,
  FaEdit,
  FaMoneyBillWave,
  FaChartLine,
} from "react-icons/fa"; 

const API = "http://127.0.0.1:8000";

function Loans() {
  const [loading, setLoading] = useState(true);

  const [loans, setLoans] = useState([]);

  const [form, setForm] = useState({
    lender_name: "",
    loan_type: "",
    outstanding_amount: "",
    emi: "",
    overdue_months: "",
    monthly_income: "",
  });
  const [editingId, setEditingId] = useState(null);
const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/loans/`);

      setLoans(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load loans.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
const editLoan = (loan) => {
  setForm({
    lender_name: loan.lender_name,
    loan_type: loan.loan_type,
    outstanding_amount: loan.outstanding_amount,
    emi: loan.emi,
    overdue_months: loan.overdue_months,
    monthly_income: loan.monthly_income,
  });

  setEditingId(loan.id);
  setIsEditing(true);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  const addLoan = async (e) => {
  e.preventDefault();

  const loanData = {
    lender_name: form.lender_name,
    loan_type: form.loan_type,
    outstanding_amount: Number(form.outstanding_amount),
    emi: Number(form.emi),
    overdue_months: Number(form.overdue_months),
    monthly_income: Number(form.monthly_income),
    status: "Active",
  };

  try {
    if (isEditing) {
      await axios.put(`${API}/loans/${editingId}`, loanData);

      alert("Loan Updated Successfully!");

      setIsEditing(false);
      setEditingId(null);
    } else {
      await axios.post(`${API}/loans/`, loanData);

      alert("Loan Added Successfully!");
    }

    setForm({
      lender_name: "",
      loan_type: "",
      outstanding_amount: "",
      emi: "",
      overdue_months: "",
      monthly_income: "",
    });

    fetchLoans();

  } catch (err) {
    console.log(err);
    alert("Operation Failed");
  }
};

  const deleteLoan = async (id) => {
    if (!window.confirm("Delete this loan?")) return;

    try {
      await axios.delete(`${API}/loans/${id}`);

      fetchLoans();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  // ==========================
  // Dashboard Statistics
  // ==========================

  const totalLoans = loans.length;

  const totalOutstanding = useMemo(() => {
    return loans.reduce(
      (sum, loan) => sum + Number(loan.outstanding_amount),
      0
    );
  }, [loans]);

  const totalEMI = useMemo(() => {
    return loans.reduce(
      (sum, loan) => sum + Number(loan.emi),
      0
    );
  }, [loans]);

  const totalIncome = useMemo(() => {
    return loans.reduce(
      (sum, loan) => sum + Number(loan.monthly_income),
      0
    );
  }, [loans]);

  const risk =
    totalEMI > totalIncome * 0.6
      ? "High"
      : totalEMI > totalIncome * 0.4
      ? "Medium"
      : "Low";

  return (
  <div className="min-h-screen bg-slate-100">

  {/* Navbar */}

  <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-indigo-700 shadow-xl">

    <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

      <h1 className="text-3xl font-bold text-white">
        💳 Loan Manager
      </h1>

      <Link
        to="/dashboard"
        className="bg-white text-blue-700 px-5 py-2 rounded-xl font-semibold hover:bg-slate-100 transition"
      >
        ← Dashboard
      </Link>

    </div>

  </nav>

  <div className="max-w-7xl mx-auto px-8 py-10">

    {/* Heading */}

    <div className="mb-10">

      <h1 className="text-5xl font-bold text-slate-800">
        Manage Loans
      </h1>

      <p className="text-gray-500 mt-2 text-lg">
        Add, manage and monitor all your active loans.
      </p>

    </div>

    {/* Summary Cards */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">

      {/* Total Loans */}

      <motion.div
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.2 }}
  className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl"
>

        <FaUniversity className="text-5xl text-blue-600 mb-5" />

        <p className="text-gray-500">
          Total Loans
        </p>

        <h2 className="text-5xl font-bold mt-3">
          {totalLoans}
        </h2>

      </motion.div>

      {/* Outstanding */}

      <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

        <FaMoneyBillWave className="text-5xl text-green-600 mb-5" />

        <p className="text-gray-500">
          Outstanding Amount
        </p>

        <h2 className="text-3xl font-bold mt-3">

          ₹{totalOutstanding.toLocaleString()}

        </h2>

      </div>

      {/* EMI */}

      <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

        <FaFileInvoiceDollar className="text-5xl text-orange-500 mb-5" />

        <p className="text-gray-500">
          Monthly EMI
        </p>

        <h2 className="text-3xl font-bold mt-3">

          ₹{totalEMI.toLocaleString()}

        </h2>

      </div>

      {/* Risk */}

      <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

        <FaChartLine className="text-5xl text-purple-600 mb-5" />

        <p className="text-gray-500">
          Debt Risk
        </p>

        <span
          className={`inline-block mt-4 px-5 py-2 rounded-full font-bold text-lg
          ${
            risk === "High"
              ? "bg-red-100 text-red-600"
              : risk === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-600"
          }`}
        >
          {risk}
        </span>

      </div>

    </div>

    {/* Add Loan Card */}
<div className="bg-white rounded-3xl shadow-xl p-8 mt-12">
<h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <FaPlusCircle /> Add New Loan
        </h2>

        <form
  onSubmit={addLoan}
  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8"
>

  {/* Bank Name */}

  <div>
    <label className="block mb-2 font-semibold text-slate-700">
      🏦 Bank Name
    </label>

    <input
      type="text"
      name="lender_name"
      value={form.lender_name}
      onChange={handleChange}
      placeholder="HDFC Bank"
      required
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Loan Type */}

  <div>
    <label className="block mb-2 font-semibold text-slate-700">
      📄 Loan Type
    </label>

    <input
      type="text"
      name="loan_type"
      value={form.loan_type}
      onChange={handleChange}
      placeholder="Personal Loan"
      required
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Outstanding */}

  <div>
    <label className="block mb-2 font-semibold text-slate-700">
      💰 Outstanding Amount
    </label>

    <input
      type="number"
      name="outstanding_amount"
      value={form.outstanding_amount}
      onChange={handleChange}
      placeholder="500000"
      required
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* EMI */}

  <div>
    <label className="block mb-2 font-semibold text-slate-700">
      💳 Monthly EMI
    </label>

    <input
      type="number"
      name="emi"
      value={form.emi}
      onChange={handleChange}
      placeholder="22000"
      required
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Overdue */}

  <div>
    <label className="block mb-2 font-semibold text-slate-700">
      📅 Overdue Months
    </label>

    <input
      type="number"
      name="overdue_months"
      value={form.overdue_months}
      onChange={handleChange}
      placeholder="4"
      required
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Income */}

  <div>
    <label className="block mb-2 font-semibold text-slate-700">
      💵 Monthly Income
    </label>

    <input
      type="number"
      name="monthly_income"
      value={form.monthly_income}
      onChange={handleChange}
      placeholder="45000"
      required
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Button */}

  <div className="xl:col-span-3 md:col-span-2 mt-3">

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition duration-300"
    >
  {isEditing ? "💾 Update Loan" : "➕ Add Loan"}
    </button>

  </div>

</form>
      </div>
      </div>

    <div className="mt-10">

        <h2 className="text-3xl font-bold text-slate-800 mb-8">
  My Loans
</h2>

       {loading ? (

  <div className="bg-white rounded-3xl shadow-xl p-10 text-center text-xl">
   <div className="flex flex-col items-center py-10">

  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>

  <p className="mt-4 text-gray-600 text-lg">
    Loading your loans...
  </p>

</div>
  </div>

) : loans.length === 0 ? (

  <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

    <h2 className="text-3xl font-bold text-slate-700">
      No Loans Found
    </h2>

    <p className="text-gray-500 mt-3">
      Add your first loan using the form above.
    </p>

  </div>

) : (

  <div className="space-y-8">

    {loans.map((loan) => (

     <motion.div
  key={loan.id}
  whileHover={{ y: -5 }}
  transition={{ duration: 0.2 }}
  className="bg-white rounded-3xl shadow-xl p-8 mb-8 hover:shadow-2xl"
>

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">

          <div>

            <h2 className="text-3xl font-bold flex items-center gap-3">

              <FaUniversity className="text-blue-600" />

              {loan.lender_name}

            </h2>

            <p className="text-gray-500 mt-2">
              {loan.loan_type}
            </p>

          </div>

          <span
            className={`px-5 py-2 rounded-full font-semibold
              ${
                loan.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {loan.status}
          </span>

        </div>

        {/* Details */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-10">

          <div>

            <p className="text-gray-500">
              Outstanding
            </p>

            <h3 className="text-2xl font-bold mt-2">
              ₹{loan.outstanding_amount.toLocaleString()}
            </h3>

          </div>

          <div>

            <p className="text-gray-500">
              Monthly EMI
            </p>

            <h3 className="text-2xl font-bold mt-2">
              ₹{loan.emi.toLocaleString()}
            </h3>

          </div>

          <div>

            <p className="text-gray-500">
              Monthly Income
            </p>

            <h3 className="text-2xl font-bold mt-2">
              ₹{loan.monthly_income.toLocaleString()}
            </h3>

          </div>

          <div>

            <p className="text-gray-500">
              Overdue
            </p>

            <h3 className="text-2xl font-bold text-red-600 mt-2">
              {loan.overdue_months} Months
            </h3>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-wrap gap-4 mt-10">

          <Link
            to="/settlement"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <FaFileInvoiceDollar />
            Settlement
          </Link>

          <Link
            to="/negotiation"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <FaComments />
            Negotiate
          </Link>
<button
  onClick={() => editLoan(loan)}
  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition"
>
  <FaEdit />
  Edit
</button>
          <button
            onClick={() => deleteLoan(loan.id)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <FaTrash />
            Delete
          </button>

        </div>

      </motion.div>

    ))}

  </div>

)}

      </div>

    </div>
  );
}

export default Loans;