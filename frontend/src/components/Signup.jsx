import React, { useState } from "react";
import api from "../utils/api"; // Import the Axios instance
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      const { data } = await api.post("/user/signup", { username, email, password });
      toast.success(data.message || "Registered successfully");
      localStorage.setItem("jwt", data.token);
      navigateTo("/login");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-5 text-center">
          Task Management - Signup
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3"
          >
            Signup
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;