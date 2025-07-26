import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { registerUser } from "../redux/slice/authSlice";
import confetti from 'canvas-confetti';


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

 const postdata = async (e) => {
  e.preventDefault();
  setloading(true);
  try {
    await dispatch(registerUser(input)); // Make sure to await this
    toast.success("Signup successfully");

    // 🎉 Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error("Signup failed");
  } finally {
    setloading(false);
  }
};

  return (
    <div>
      <div data-aos="fade-up" class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">
            Create New Account
          </h1>

          {/* <!-- Login Form --> */}
          <form onSubmit={postdata}>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="name"
                id="name"
                name="name"
                placeholder="Enter your name"
                class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
                value={input.name}
                onChange={handlechange}
              />
            </div>
            {/* <!-- Email Input --> */}
            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
                value={input.email}
                onChange={handlechange}
              />
            </div>

            {/* <!-- Password Input --> */}
            <div class="mb-4">
              <label
                for="password"
                class="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
                value={input.password}
                onChange={handlechange}
              />
            </div>

            {/* <!-- Submit Button --> */}
            <button
              type="submit"
              class="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "wait for second" : "Sign Up"}
            </button>
          </form>

          {/* <!-- Divider --> */}
          <div class="mt-6 flex items-center">
            <div class="border-t border-gray-300 flex-grow"></div>
            <span class="mx-2 text-gray-500 text-sm">or</span>
            <div class="border-t border-gray-300 flex-grow"></div>
          </div>

          {/* <!-- Social Login --> */}
          <div class="mt-6">
            <button class="w-full flex items-center justify-center px-4 py-2 border rounded-lg text-gray-800 bg-gray-50 hover:bg-gray-100 transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google Logo"
                class="w-5 h-5 mr-2"
              />
              Login with Google
            </button>
          </div>

          {/* <!-- Sign Up Link --> */}
          <p class="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <a href="/login" class="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
