import { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-4 md:p-6 pt-24 md:pt-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-2">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6 backdrop-blur-xl">
        <div className="flex items-center gap-5">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-20 h-20 rounded-full border-2 border-purple-500"
          />

          <div>
            <h2 className="text-2xl font-semibold">Princy</h2>
            <p className="text-gray-400">Frontend Developer</p>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
          />
        </div>

        <button className="mt-5 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
          Save Changes
        </button>
      </div>

      {/* Preferences */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-5">Notifications</h3>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-400">
                Receive updates instantly
              </p>
            </div>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-7 rounded-full transition relative ${
                notifications ? "bg-purple-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition ${
                  notifications ? "left-8" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-400">
                Get updates through email
              </p>
            </div>

            <button className="w-14 h-7 rounded-full bg-purple-500 relative">
              <div className="absolute top-1 left-8 w-5 h-5 bg-white rounded-full" />
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-5">Appearance</h3>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-gray-400">
                Enable dark theme interface
              </p>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-7 rounded-full transition relative ${
                darkMode ? "bg-pink-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition ${
                  darkMode ? "left-8" : "left-1"
                }`}
              />
            </button>
          </div>

          <div>
            <p className="font-medium mb-3">Theme Color</p>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-pink-500 cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-6">
        <h3 className="text-xl font-semibold mb-5">Security</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
          />

          <input
            type="password"
            placeholder="New Password"
            className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
          />
        </div>

        <button className="mt-5 bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default Settings;