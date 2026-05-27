import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import { registerUser } from "../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // PASSWORD STRENGTH
  const getStrength = () => {
    let strength = 0;

    if (
      formData.password.length > 5
    )
      strength++;

    if (
      formData.password.length >
        8 &&
      /[A-Z]/.test(
        formData.password
      )
    )
      strength++;

    if (
      formData.password.length >
        10 &&
      /[0-9]/.test(
        formData.password
      )
    )
      strength++;

    if (
      formData.password.length >
        12 &&
      /[^A-Za-z0-9]/.test(
        formData.password
      )
    )
      strength++;

    return strength;
  };

  const strength = getStrength();

  const strengthColors = [
    "bg-white/10",
    "bg-red-400",
    "bg-pink-400",
    "bg-purple-400",
    "bg-green-400",
  ];

  const labels = [
    "Weak",
    "Weak",
    "Fair",
    "Strong",
    "Excellent",
  ];

  // REGISTER SUBMIT
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    // PASSWORD MATCH CHECK
    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match"
      );
    }

    try {
      setLoading(true);

      await registerUser({
        name: formData.name,
        email: formData.email,
        password:
          formData.password,
      });

      toast.success(
        "Account created successfully"
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Register failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] overflow-hidden relative">

      {/* BLOBS */}

      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[100px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[100px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* HEADER */}

      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">

        <h1 className="text-3xl font-extrabold text-purple-300">
          Nexus
        </h1>

      </header>

      {/* MAIN */}

      <main className="flex min-h-screen flex-col lg:flex-row">

        {/* LEFT */}

        <section className="hidden lg:flex lg:w-1/2 items-center justify-center p-10">

          <div className="max-w-xl">

            <img
              src="https://lh3.googleusercontent.com/aida/ADBb0uilAMESMK6etk4vL320rLQhwP8bs5rqkNSOxYGIvdQ4QSWHcB0h1D48Y3Vxsd4ph9s9qrriJCW5lvzn4SXsQWSIHyhVt7TSz45eA7UXJAim5MnNEieU8Nsis2x9AblmhN1PvcMeoBO-EUuj1GBDql0qdHJWg2EJx3D-c5GLWxGJ3LUKaCwxrfTZa2ORMLcngBIp7zcODt_s1E_7hMHkFXNqTehBr5vsAKUoeIDTuirmbLVPZ7_WpFSBNAmZ"
              alt="Hero"
              className="w-full max-w-md mx-auto mb-10 animate-bounce"
            />

            <h1 className="text-6xl font-extrabold leading-tight text-white mb-6">

              Join the next generation of{" "}

              <span className="text-pink-400">
                explorers.
              </span>

            </h1>

            <p className="text-gray-400 text-lg leading-8">
              Elevate your team's
              workflow in minutes.
            </p>

          </div>

        </section>

        {/* RIGHT */}

        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">

          <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="mb-8">

              <h2 className="text-4xl font-bold text-white mb-2">
                Create Account
              </h2>

              <p className="text-gray-400">
                Start your Nexus
                journey today.
              </p>

            </div>

            {/* FORM */}

            <form
              className="space-y-5"
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={
                  handleChange
                }
                placeholder="Full Name"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white outline-none focus:border-purple-400"
              />

              {/* EMAIL */}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={
                  handleChange
                }
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white outline-none focus:border-purple-400"
              />

              {/* PASSWORD */}

              <div>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Password"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white outline-none focus:border-purple-400"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

                {/* STRENGTH */}

                <div className="flex gap-1 mt-3">

                  {[1, 2, 3, 4].map(
                    (bar) => (
                      <div
                        key={bar}
                        className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                          bar <=
                          strength
                            ? strengthColors[
                                strength
                              ]
                            : "bg-white/10"
                        }`}
                      />
                    )
                  )}

                </div>

                <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">

                  Strength:{" "}
                  {labels[strength]}

                </p>

              </div>

              {/* CONFIRM PASSWORD */}

              <input
                type="password"
                name="confirmPassword"
                value={
                  formData.confirmPassword
                }
                onChange={
                  handleChange
                }
                placeholder="Confirm Password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white outline-none focus:border-purple-400"
              />

              {/* BUTTON */}

              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >

                {loading
                  ? "Loading..."
                  : "Create Account"}

              </button>

            </form>

            {/* LOGIN */}

            <p className="text-center text-gray-400 mt-8">

              Already have an
              account?{" "}

              <Link
                to="/"
                className="text-purple-300 font-bold hover:underline"
              >
                Sign In
              </Link>

            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Register;