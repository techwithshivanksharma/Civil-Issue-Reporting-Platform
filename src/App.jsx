import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReportIssues from "./pages/ReportIssues";
import ViewIssues from "./pages/ViewIssues";
import DashBoard from "./pages/DashBoard";
import IssueDetails from "./pages/IssueDetails";
import Login from "./pages/Login";

import { AuthProvider } from "./context/AuthContext";
import { IssueProvider } from "./context/IssueContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <IssueProvider>
          <Navbar />
          <Routes>
            {/*Public Route */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />

            {/*Protected Routes (need login) */}
            <Route
              path="/report"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <ReportIssues />
                </ProtectedRoute>
              }
            />
            <Route
              path="/issues"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <ViewIssues />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <DashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/issue/:id"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <IssueDetails />
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* 🔔 Toast notification container */}
          <Toaster
            position="top-center"
            toastOptions={{
              success: { style: { background: "#4ade80", color: "white" } },
              error: { style: { background: "#ef4444", color: "white" } },
            }}
          />
        </IssueProvider>
      </AuthProvider>
    </>
  );
}

export default App;
