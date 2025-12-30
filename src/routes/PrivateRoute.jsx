import { useContext, useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);
  const toastShown = useRef(false);

  // ✅ ALL hooks declared FIRST
  useEffect(() => {
    if (!loading && !user && !toastShown.current) {
      toast.error("Please login first");
      toastShown.current = true;
    }
  }, [loading, user]);

  // ⏳ Wait till auth is resolved
  if (loading) return null;

  // 🚫 Not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow route
  return <Outlet />;
};

export default PrivateRoute;
