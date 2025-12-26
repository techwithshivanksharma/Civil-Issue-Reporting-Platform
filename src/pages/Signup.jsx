import React, { use, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaLock, FaUserTag, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const {register} = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    //calling authcontext register

    const result = register(name, email, username, password, role);

    if(!result.success){
      setError(result.message);
      toast.error(result.message);
      return;
    }

    toast.success("Account created successfully 🎉");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-4">
      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-2xl p-8 w-full max-w-md text-white animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-md">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 border border-white/30">
            <FaUser className="text-white mr-3" />
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent w-full text-white placeholder-white/70 outline-none"
            />
          </div>

          {/*Email*/}
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 border border-white/30">
            <FaEnvelope className="text-white mr-3" />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full text-white placeholder-white/70 outline-none"
            />
          </div>

          {/* Username */}
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 border border-white/30">
            <FaUserTag className="text-white mr-3" />
            <input
              type="text"
              placeholder="Choose Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent w-full text-white placeholder-white/70 outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 border border-white/30">
            <FaLock className="text-white mr-3" />
            <input
              type="password"
              placeholder="Create Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full text-white placeholder-white/70 outline-none"
            />
          </div>

          {/* Role Select */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-white/20 border border-white/30 text-white rounded-lg px-4 py-2 outline-none"
          >
            <option className="text-black" value="user">
              User
            </option>
            <option className="text-black" value="admin">
              Admin
            </option>
          </select>

          {error && <p className="text-red-300 text-sm text-center">{error}</p>}

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-white text-purple-700 font-semibold py-2 rounded-lg hover:bg-gray-100 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/90">
          Already have an account?{" "}
          <span
            className="font-bold cursor-pointer hover:text-yellow-300"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
