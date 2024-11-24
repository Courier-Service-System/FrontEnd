import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import AdminSignUpPage from "./Pages/AdminSignUpPage";
import LoginPage from "./Pages/LoginPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import AdminDashboardPage from "./Pages/AdminDashboardPage";
import UserDashboardPage from "./Pages/UserDashboardPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register-user" element={<SignUpPage />} />
        <Route path="/register-admin" element={<AdminSignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/user-dashboard" element={<UserDashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
