import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import StaffDashboard from "./pages/staff/StaffDashboard";
import HodDashboard from "./pages/hod/HodDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ApplyLeave from "./pages/staff/ApplyLeave";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute role="Staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/apply-leave"
          element={
            <ProtectedRoute role="Staff">
              <ApplyLeave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hod/dashboard"
          element={
            <ProtectedRoute role="HOD">
              <HodDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
