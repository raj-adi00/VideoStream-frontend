import React, { useState } from "react";
import axios from "axios";
import UserSevice from "./Utility/User";
import { useDispatch } from "react-redux";
import { setLoadingState, userLogin } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewUserToggle = () => {
    setIsNewUser(!isNewUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingState(true));
    const formdataobj = new FormData();
    formdataobj.append("username", formData.username);
    formdataobj.append("password", formData.password);
    try {
      const user = await UserSevice.login(formdataobj);
      if (user?.status < 400) {
        dispatch(userLogin(user.data.data.user));
        setMessage(user.data.message);
        setError(null);
        navigate("/");
      } else {
        setMessage(null);
        setError(user?.data?.message || "Please try again");
      }
    } catch (err) {
      setMessage(null);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoadingState(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
        {error && (
          <div className="bg-red-500 text-white text-center py-2 rounded-lg">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-500 text-white text-center py-2 rounded-lg">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Login
          </button>
          <div className="text-center">
            <p className="text-white">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-400 hover:underline">
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
