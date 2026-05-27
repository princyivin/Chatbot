import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";

const ForgotPassword = () => {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleForgotPassword =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await axios.post(
            "http://localhost:8000/api/auth/forgot-password",
            {
              email,
            }
          );

        toast.success(
          res.data.message
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );

      } finally {

        setLoading(false);

      }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] flex items-center justify-center p-6 text-white">

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

        <h1 className="text-4xl font-bold mb-2">
          Forgot Password
        </h1>

        <p className="text-gray-400 mb-8">
          Enter your email to receive reset link.
        </p>

        <form
          onSubmit={
            handleForgotPassword
          }
          className="space-y-6"
        >

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-purple-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:scale-[1.02] transition-all"
          >

            {loading
              ? "Sending..."
              : "Send Reset Link"}

          </button>

          <div className="text-center">

            <Link
              to="/"
              className="text-purple-300 hover:underline"
            >
              Back to Login
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ForgotPassword;