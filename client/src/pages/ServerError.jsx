import { useNavigate } from "react-router-dom";

const ServerError = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b1120] text-white flex items-center justify-center px-6">

      <div className="text-center max-w-2xl">

        {/* ICON */}
        <div className="text-[120px] mb-8">
          ⚠️
        </div>

        {/* TITLE */}
        <h1 className="text-5xl md:text-6xl font-black">
          Server Error
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-400 mt-6 text-lg leading-relaxed">
          Something went wrong on our servers. Please try again later or contact support if the problem persists.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap justify-center gap-5 mt-10">

          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-pink-500 px-7 py-4 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Retry
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white/5 border border-white/10 px-7 py-4 rounded-2xl hover:bg-white/10 transition"
          >
            Dashboard
          </button>

        </div>

        {/* STATUS */}
        <div className="mt-14 bg-white/5 border border-white/10 rounded-3xl p-6 text-left">

          <p className="text-gray-400 mb-3">
            Error Code
          </p>

          <h2 className="text-2xl font-bold">
            500 INTERNAL SERVER ERROR
          </h2>

        </div>

      </div>

    </div>
  );
};

export default ServerError;