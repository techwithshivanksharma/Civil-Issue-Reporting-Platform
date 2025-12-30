import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ReportIssues from "./pages/ReportIssues";
import ViewIssues from "./pages/ViewIssues";
import DashBoard from "./pages/DashBoard";
import IssueDetails from "./pages/IssueDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import PrivateRoute from "./routes/PrivateRoute";

import { AuthProvider } from "./context/AuthContext";
import { IssueProvider } from "./context/IssueContext";

function App() {
  return (
    <>
      <AuthProvider>
        <IssueProvider>
          <Navbar />

          <Routes>
            {/* 🌐 Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 🔒 Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/report" element={<ReportIssues />} />
              <Route path="/issues" element={<ViewIssues />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/issue/:id" element={<IssueDetails />} />
            </Route>
          </Routes>

          {/* 🔔 Toast container */}
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
