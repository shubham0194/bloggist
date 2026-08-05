import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../Appwrite/Auth";
import { login } from "../store/slice";
import { serializeUser } from "../utils/serializeUser";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const handleSignup = async (data) => {
    try {
      const user = await authService.createAccount(data);
      dispatch(login({ userData: serializeUser(user) }));
      navigate("/");
    } catch (error) {
      setError("Failed to create account. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authService.loginWithGoogle();
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <div className="w-full h-220 flex items-center justify-center bg-linear-to-br from-sky-100 to-gray-200 px-4">
      
      <form
        onSubmit={handleSubmit(handleSignup)}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-200"
      >
        {/* Header */}
        <div className="px-8 pt-10 pb-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mt-2 text-sm">
            Join Bloggist and start exploring 🚀
          </p>
        </div>

        {/* Form */}
        <div className="px-8 pb-6 space-y-5">
          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}

          <input
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            {...register("name", { required: true })}
          />

          <input
            placeholder="Email Address"
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            {...register("email", { required: true })}
          />

          <input
            placeholder="Password"
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            {...register("password", { required: true })}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-lg border border-gray-300 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 text-center text-sm rounded-b-2xl">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;