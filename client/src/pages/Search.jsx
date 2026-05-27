import { useState } from "react";

const usersData = [
  {
    id: 1,
    name: "Princy",
    role: "Frontend Developer",
    email: "princy@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 2,
    name: "Alex Johnson",
    role: "UI/UX Designer",
    email: "alex@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Backend Developer",
    email: "sophia@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=24",
  },
  {
    id: 4,
    name: "David Miller",
    role: "Project Manager",
    email: "david@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-4 md:p-6 pt-24 md:pt-6">
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Search Users
        </h1>

        <p className="text-gray-400 mt-2">
          Search team members, developers, and collaborators.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-10">
        
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 pl-14 text-white outline-none focus:border-purple-500 transition"
        />

        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
          🔍
        </span>

      </div>

      {/* USERS GRID */}
      {filteredUsers.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:scale-[1.02] transition"
            >
              
              {/* TOP */}
              <div className="flex items-center gap-4">

                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
                />

                <div>
                  <h2 className="text-2xl font-semibold">
                    {user.name}
                  </h2>

                  <p className="text-purple-400 mt-1">
                    {user.role}
                  </p>
                </div>

              </div>

              {/* INFO */}
              <div className="mt-6 space-y-3">

                <div className="flex items-center gap-3 text-gray-300">
                  <span>📧</span>
                  <p>{user.email}</p>
                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-6">

                <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-2xl font-semibold hover:scale-105 transition">
                  View Profile
                </button>

                <button className="px-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition">
                  💬
                </button>

              </div>

            </div>
          ))}

        </div>
      ) : (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center mt-24">

          <div className="text-8xl mb-6">
            😕
          </div>

          <h2 className="text-3xl font-bold">
            No Users Found
          </h2>

          <p className="text-gray-400 mt-3">
            Try searching with another keyword.
          </p>

        </div>
      )}
    </div>
  );
};

export default Search;