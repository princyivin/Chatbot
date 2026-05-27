import {
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  useGoogleLogin,
} from "@react-oauth/google";

export default function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  // GOOGLE LOGIN
  const googleLogin =
  useGoogleLogin({

    onSuccess:
      async (
        tokenResponse
      ) => {

        try {

          // SEND TOKEN TO BACKEND
          const res =
            await axios.post(
              "http://localhost:8000/api/auth/google",
              {
                access_token:
                  tokenResponse.access_token,
              }
            );

          // SAVE JWT
          localStorage.setItem(
            "token",
            res.data.token
          );

          // REDIRECT
          navigate(
            "/dashboard"
          );

        } catch (error) {

          console.log(error);

        }

      },

    onError: () => {

      console.log(
        "Google Login Failed"
      );

    },

  });

  // NORMAL LOGIN
  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await axios.post(
            "http://localhost:8000/api/auth/login",
            {
              email,
              password,
            }
          );

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          res.data.token
        );

        // NAVIGATE
        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
          "Login failed"
        );

      } finally {

        setLoading(false);

      }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050B1A] px-4">

      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center">

          <div className="relative">

            <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600/30 blur-[120px] rounded-full" />

            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop"
              alt="Login"
              className="rounded-[40px] shadow-2xl border border-white/10"
            />

          </div>

          <h1 className="text-7xl font-bold leading-tight text-white mt-10">

            Start your
            <br />

            journey with

            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">

              {" "}Nexus.

            </span>

          </h1>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative">

          <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500/20 blur-[120px] rounded-full" />

          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[36px] p-10 shadow-2xl">

            <h2 className="text-5xl font-bold text-white mb-3">

              Welcome Back

            </h2>

            <p className="text-gray-400 text-lg mb-10">

              Enter your credentials to access your workspace.

            </p>

            {/* SOCIAL LOGIN */}
            <div className="grid grid-cols-2 gap-4 mb-8">

              {/* GOOGLE BUTTON */}
              <button
                onClick={() =>
                  googleLogin()
                }
                className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl py-4 font-medium text-white transition-all duration-300"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-6 h-6"
                >

                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303C33.659 32.657 29.244 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />

                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />

                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.193l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.629-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />

                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.058 3.002-3.11 5.401-5.684 6.97l.003-.002 6.19 5.238C39.99 36.53 44 30.74 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />

                </svg>

                Continue with Google

              </button>

              {/* GITHUB BUTTON */}
              <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl py-4 font-medium text-white transition-all duration-300">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >

                  <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 008 10.938c.586.11.797-.254.797-.566 0-.281-.012-1.215-.016-2.203-3.25.707-3.938-1.566-3.938-1.566-.531-1.348-1.297-1.707-1.297-1.707-1.06-.723.082-.707.082-.707 1.172.082 1.789 1.203 1.789 1.203 1.04 1.781 2.727 1.266 3.39.969.106-.754.407-1.266.742-1.558-2.594-.293-5.32-1.297-5.32-5.773 0-1.274.453-2.316 1.203-3.133-.121-.297-.523-1.48.113-3.086 0 0 .98-.313 3.211 1.195A11.1 11.1 0 0112 6.09c.977.004 1.961.133 2.879.39 2.227-1.508 3.203-1.195 3.203-1.195.64 1.606.238 2.79.117 3.086.75.817 1.203 1.86 1.203 3.133 0 4.488-2.73 5.477-5.332 5.766.418.36.79 1.086.79 2.188 0 1.582-.015 2.856-.015 3.246 0 .316.21.683.804.566A11.502 11.502 0 0023.5 12C23.5 5.648 18.352.5 12 .5z" />

                </svg>

                GitHub

              </button>

            </div>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 mb-8">

              <div className="flex-1 h-px bg-white/10" />

              <span className="text-gray-500 text-sm">

                OR CONTINUE WITH EMAIL

              </span>

              <div className="flex-1 h-px bg-white/10" />

            </div>

            {/* FORM */}
            <form
              onSubmit={handleLogin}
              className="space-y-6"
            >

              {/* EMAIL */}
              <div>

                <label className="block text-gray-300 mb-3">

                  Email Address

                </label>

                <input
                  type="email"
                  placeholder="explorer@nexus.io"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition"
                />

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-gray-300 mb-3">

                  Password

                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition"
                />

              </div>

              {/* OPTIONS */}
              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-gray-400">

                  <input
                    type="checkbox"
                    className="accent-purple-500"
                  />

                  Remember me

                </label>

                <Link
                  to="/forgot-password"
                  className="text-purple-400 hover:text-purple-300"
                >

                  Forgot password?

                </Link>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 py-4 rounded-2xl font-semibold text-lg transition-all duration-300"
              >

                {loading
                  ? "Logging in..."
                  : "Login to Nexus"}

              </button>

            </form>

            {/* REGISTER */}
            <p className="text-center text-gray-400 mt-8">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >

                Create one.

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}