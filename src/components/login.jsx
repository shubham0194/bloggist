import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/slice";
import { useDispatch } from "react-redux";
import authService from "../Appwrite/Auth";
import { serializeUser } from "../utils/serializeUser";
import { useForm } from "react-hook-form";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  
  const onSubmit = async (data) => {
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getUser();
        dispatch(authLogin({ userData: serializeUser(userData) }));
        navigate("/");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full h-200 flex items-center justify-center bg-linear-to-br from-blue-50 to-gray-300 px-4">
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-200">
        
        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-2">
            Login to continue to Bloggist
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-6 space-y-5">
          
          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            {...register("email", { required: true })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            {...register("password", { required: true })}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 text-center text-sm rounded-b-2xl">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;