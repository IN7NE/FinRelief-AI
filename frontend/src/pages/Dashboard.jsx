import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <nav className="bg-blue-700 text-white p-4 flex justify-between">

        <h1 className="text-2xl font-bold">
          FinRelief AI
        </h1>

        <button
          onClick={()=>{
            localStorage.removeItem("token");
            window.location.href="/login";
          }}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </nav>

      {/* Dashboard */}

      <div className="p-8">

        <h2 className="text-3xl font-bold mb-8">
          Financial Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              Total Loans
            </h3>

            <p className="text-4xl font-bold text-blue-700">
              0
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              Monthly EMI
            </h3>

            <p className="text-4xl font-bold text-green-600">
              ₹0
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              Debt Stress
            </h3>

            <p className="text-4xl font-bold text-red-600">
              Low
            </p>

          </div>

        </div>

        <div className="mt-10 flex gap-4">

          <Link
            to="/loans"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Manage Loans
          </Link>

          <Link
            to="/settlement"
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
          >
            Settlement Recommendation
          </Link>

          <Link
            to="/negotiation"
            className="bg-purple-600 text-white px-5 py-3 rounded-lg"
          >
            AI Negotiation
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;