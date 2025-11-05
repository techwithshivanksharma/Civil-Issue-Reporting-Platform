import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login To CIRP
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border w-full px-3 py-2 mb-3 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full px-3 py-2 mb-3 rounded-md"
          />
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600 text-center">
          <p>
            Admin - username <b>admin</b> | password: <b>1234</b>
          </p>
          <p>
            User - username <b>user</b> | password: <b>1234</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
