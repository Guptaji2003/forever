import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../redux/slice/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const postData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await dispatch(loginUser(input)).unwrap();
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login to Your Account
        </h1>

        <form onSubmit={postData}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              value={input.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              value={input.password}
              onChange={handleChange}
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="text-blue-600 rounded focus:ring-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Remember Me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {/* Google Login (Static) */}
        <div className="mt-6">
          <button className="w-full flex items-center justify-center px-4 py-2 border rounded-lg text-gray-800 bg-gray-50 hover:bg-gray-100 transition">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Login with Google
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
