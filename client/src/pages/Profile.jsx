import { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Princy",
    role: "Frontend Developer",
    email: "princy@gmail.com",
    phone: "+91 9876543210",
    location: "Chennai, India",
    bio: "Passionate frontend developer building modern and beautiful web applications using React and Node.js.",
    website: "www.princydev.com",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-4 md:p-6 pt-24 md:pt-6">
      {/* TOP BANNER */}
      <div className="relative h-[250px] rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
          alt="banner"
          className="w-full h-full object-cover opacity-30"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/20" />

        {/* PROFILE IMAGE */}
        <div className="absolute -bottom-16 left-10">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="profile"
              className="w-36 h-36 rounded-full border-4 border-[#0b1120] object-cover"
            />

            <button className="absolute bottom-2 right-2 bg-purple-500 p-2 rounded-full hover:scale-110 transition">
              📷
            </button>
          </div>
        </div>
      </div>

      {/* PROFILE CONTENT */}
      <div className="mt-24 grid lg:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-1 space-y-6">
          {/* USER CARD */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="text-center">
              <h1 className="text-3xl font-bold">{user.name}</h1>

              <p className="text-purple-400 mt-2">{user.role}</p>

              <p className="text-gray-400 mt-4 text-sm">{user.bio}</p>
            </div>

            {/* INFO */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <span>📧</span>
                <p className="text-gray-300">{user.email}</p>
              </div>

              <div className="flex items-center gap-3">
                <span>📱</span>
                <p className="text-gray-300">{user.phone}</p>
              </div>

              <div className="flex items-center gap-3">
                <span>📍</span>
                <p className="text-gray-300">{user.location}</p>
              </div>

              <div className="flex items-center gap-3">
                <span>🌐</span>
                <p className="text-gray-300">{user.website}</p>
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-5">Skills</h2>

            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Node.js",
                "MongoDB",
                "Tailwind",
                "Express",
                "JavaScript",
              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-purple-500/20 border border-purple-500/20 px-4 py-2 rounded-full text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Profile Information</h2>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {/* FORM */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* NAME */}
              <div>
                <label className="block mb-2 text-gray-400">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 disabled:opacity-70"
                />
              </div>

              {/* ROLE */}
              <div>
                <label className="block mb-2 text-gray-400">
                  Role
                </label>

                <input
                  type="text"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 disabled:opacity-70"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block mb-2 text-gray-400">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 disabled:opacity-70"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block mb-2 text-gray-400">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 disabled:opacity-70"
                />
              </div>

              {/* LOCATION */}
              <div>
                <label className="block mb-2 text-gray-400">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 disabled:opacity-70"
                />
              </div>

              {/* WEBSITE */}
              <div>
                <label className="block mb-2 text-gray-400">
                  Website
                </label>

                <input
                  type="text"
                  name="website"
                  value={user.website}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 disabled:opacity-70"
                />
              </div>
            </div>

            {/* BIO */}
            <div className="mt-6">
              <label className="block mb-2 text-gray-400">
                Bio
              </label>

              <textarea
                rows="5"
                name="bio"
                value={user.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 disabled:opacity-70 resize-none"
              />
            </div>

            {/* SAVE BUTTON */}
            {isEditing && (
              <button className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition">
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;