// import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {

    localStorage.removeItem("token");
  
    navigate("/");
  
  };

  // const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 dark:bg-[#0b1120]/70 border-b border-black/10 dark:border-white/10">

      <div className="flex items-center justify-between px-4 md:px-8 py-4">

        {/* LEFT */}
        <div>

          <h1 className="text-2xl font-bold text-black dark:text-white">
            Nexus Dashboard
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back 👋
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* SEARCH */}
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 w-72">

            <span className="mr-3 text-gray-500">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-black dark:text-white placeholder:text-gray-400"
            />

          </div>

          {/* THEME TOGGLE */}
          {/* <button
            onClick={toggleTheme}
            className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:scale-105 transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button> */}

          {/* NOTIFICATION */}
          <button className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:scale-105 transition">
            🔔
          </button>

          {/* PROFILE */}
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-3 py-2">

            <img
              src="https://i.pravatar.cc/100?img=32"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="hidden md:block">

              <h3 className="font-semibold text-black dark:text-white">
                Princy
              </h3>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Frontend Developer
              </p>

            </div>
            <button
  onClick={handleLogout}
  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white font-semibold transition"
>
  Logout
</button>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;