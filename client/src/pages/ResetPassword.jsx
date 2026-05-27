import { useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

const ResetPassword = () => {

  const navigate = useNavigate();

  const { token } = useParams();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const getStrength = () => {

    let strength = 0;

    if (password.length >= 8)
      strength++;

    if (/[A-Z]/.test(password))
      strength++;

    if (/[0-9]/.test(password))
      strength++;

    if (
      /[^A-Za-z0-9]/.test(password)
    )
      strength++;

    return strength;
  };

  const strength = getStrength();

  const labels = [
    "Too Weak",
    "Weak",
    "Fair",
    "Strong",
    "Excellent",
  ];

  // RESET PASSWORD
  const handleReset =
    async (e) => {

      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {
        return toast.error(
          "Passwords do not match"
        );
      }

      try {

        setLoading(true);

        const res =
          await axios.post(
            `http://localhost:8000/api/auth/reset-password/${token}`,
            {
              password,
            }
          );

        toast.success(
          res.data.message
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Reset failed"
        );

      } finally {

        setLoading(false);

      }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] flex items-center justify-center p-6 text-white">

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

        <h1 className="text-4xl font-bold mb-2">
          Reset Password
        </h1>

        <p className="text-gray-400 mb-8">
          Create a new secure password.
        </p>

        <form
          onSubmit={handleReset}
          className="space-y-6"
        >

          {/* PASSWORD */}

          <div>

            <label className="block mb-2 text-sm text-gray-300">
              New Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter new password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 pr-14 outline-none focus:border-purple-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-5 top-1/2 -translate-y-1/2"
              >
                {showPassword
                  ? "🙈"
                  : "👁️"}
              </button>

            </div>

            {/* PASSWORD STRENGTH */}

            <div className="flex gap-1 mt-3">

              {[1, 2, 3, 4].map(
                (bar) => (
                  <div
                    key={bar}
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                      strength >= bar
                        ? strength === 1
                          ? "bg-red-400"
                          : strength === 2
                          ? "bg-pink-400"
                          : strength === 3
                          ? "bg-purple-400"
                          : "bg-green-400"
                        : "bg-white/10"
                    }`}
                  />
                )
              )}

            </div>

            <p className="text-xs uppercase tracking-widest text-gray-400 mt-2">

              {labels[strength]}

            </p>

          </div>

          {/* CONFIRM PASSWORD */}

          <div>

            <label className="block mb-2 text-sm text-gray-300">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm password"
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className={`w-full bg-white/5 border rounded-2xl py-4 px-5 pr-14 outline-none ${
                  confirmPassword &&
                  confirmPassword !==
                    password
                    ? "border-red-400"
                    : "border-white/10"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-5 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword
                  ? "🙈"
                  : "👁️"}
              </button>

            </div>

            {confirmPassword &&
              confirmPassword !==
                password && (
                <p className="text-red-400 text-sm mt-2">
                  Passwords do not
                  match
                </p>
              )}

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={
              loading ||
              !password ||
              password !==
                confirmPassword
            }
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >

            {loading
              ? "Updating..."
              : "Reset Password"}

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

export default ResetPassword;