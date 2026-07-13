import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Loans from "../pages/Loans";
import Settlement from "../pages/Settlement";
import Negotiation from "../pages/Negotiation";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/settlement" element={<Settlement />} />
        <Route path="/negotiation" element={<Negotiation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;