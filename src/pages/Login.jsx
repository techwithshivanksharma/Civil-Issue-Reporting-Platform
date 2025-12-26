import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username, password);

    if (success) {
      toast.success("Login Successful 👋");
      navigate("/dashboard");
    } else {
      setError("Invalid Credentials");
      toast.error("Invalid Username or Password ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-4">
      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-2xl p-8 w-full max-w-md text-white animate-fadeIn">
        
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-white-800 mb-6">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin}>

          {/* Username Field */}
          <div className="relative mb-4 ">
            <FaUser className="absolute left-3 top-3 text-white-500" />
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border w-full pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* Password Field */}
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-3 text-white-500" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-700 text-white rounded-md font-semibold flex items-center justify-center gap-2 transition"
          >
            <FaSignInAlt />
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="mt-4 text-center text-sm text-white-700">
          Don’t have an account?{" "}
          <span
            className="text-white-600 font-medium hover:text-yellow-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create one
          </span>
        </p>

        {/* Test credentials */}
        <div className="mt-6 text-sm text-gray-700 text-center">
          <p className="mb-1">
            <b>Admin:</b> admin / 1234
          </p>
          <p>
            <b>User:</b> user / 1234
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
