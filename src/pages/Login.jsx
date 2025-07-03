import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../services/api";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault(); // prevent form reload on submit

    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const res = await axios.post("https://passop-backend-jx8n.onrender.com/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />

      {/* Background Blur */}
      <div className="fixed inset-0 -z-10 w-full min-h-screen overflow-hidden bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-600 opacity-20 blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-8 md:px-20 lg:px-40 py-16">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-600">&lt;</span>
          Pass
          <span className="text-green-600">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center mb-6">Your own Password Manager</p>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border border-green-600 rounded-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 border border-green-600 rounded-full"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-full"
          >
            Login
          </button>
          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-700 hover:underline">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
