import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b1120] text-white flex items-center justify-center px-6">

      <div className="text-center">

        {/* ERROR NUMBER */}
        <h1 className="text-[140px] md:text-[220px] font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent leading-none">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl md:text-5xl font-bold mt-6">
          Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed text-lg">
          The page you are looking for does not exist or may have been moved.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-10">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-4 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Go Dashboard
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-white/5 border border-white/10 px-7 py-4 rounded-2xl hover:bg-white/10 transition"
          >
            Go Back
          </button>

        </div>

        {/* DECORATION */}
        <div className="mt-16 text-7xl">
          🚀
        </div>

      </div>

    </div>
  );
};

export default NotFound;