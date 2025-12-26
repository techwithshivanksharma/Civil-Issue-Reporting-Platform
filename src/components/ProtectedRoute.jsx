import React, { use, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  //1: Wait until auth is checked
  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Checking Authentication.....
      </div>
    );
  }

  //2: If not logged, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
    // Isse jab user kisi protected page pe jaata hai (e.g. /admin) bina login kiye,
    // to hum usko login page par bhejte hain, lekin memory me store kar lete hain ki wo kahan jaa raha tha.
    // Baad me login hone ke baad hum use wapas usi route par redirect kar sakte hain (optional next step).
  }

  //3: Role based protection
  if (allowedRoles && (!user.role || !allowedRoles.includes(user.role))) {
    return (
      <div
        className=""
        flex
        flex-col
        items-center
        justify-center
        min-h-screen
        text-center
      >
        <h2 className="text-2xl font-semibold text-red-600 mb-2">
          🚫 Access Denied
        </h2>
        <p className="text-gray-500">
          Sorry your account doesn't have permission to view this page.
        </p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
