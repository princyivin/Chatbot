import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { io }
  from "socket.io-client";

import {
  useNavigate,
} from "react-router-dom";

import { jwtDecode }
  from "jwt-decode";

// SOCKET
const socket = io(
  "http://localhost:8000"
);

const Team = () => {

  const [members, setMembers] =
    useState([]);

  const [onlineUsers,
    setOnlineUsers] =
    useState([]);

  const navigate =
    useNavigate();

  // TOKEN
  const token =
    localStorage.getItem(
      "token"
    );

  // SAFETY
  if (!token) {

    return (
      <div className="min-h-screen bg-[#0b1120] flex items-center justify-center text-white text-2xl">

        Please login first

      </div>
    );

  }

  // CURRENT USER
  const decoded =
    jwtDecode(token);

  const currentUserId =
    decoded.id;

  // FETCH USERS
  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:8000/api/users"
          );

        setMembers(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

  };

  // ONLINE USERS
  useEffect(() => {

    // SEND ONLINE STATUS
    socket.emit(
      "user_online",
      currentUserId
    );

    // RECEIVE ONLINE USERS
    socket.on(
      "online_users",
      (users) => {

        setOnlineUsers(
          users
        );

      }
    );

    return () => {

      socket.off(
        "online_users"
      );

    };

  }, []);

  // MESSAGE BUTTON
  const handleMessage =
    async (userId) => {

      try {

        if (
          currentUserId ===
          userId
        ) {

          alert(
            "Cannot message yourself"
          );

          return;

        }

        const res =
          await axios.post(
            "http://localhost:8000/api/conversations/find-or-create",
            {
              user1:
                currentUserId,

              user2:
                userId,
            }
          );

        navigate(
          `/chat/${res.data.id}`
        );

      } catch (error) {

        console.log(error);

      }

  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-4 md:p-6 pt-24 md:pt-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-5">

        <div>

          <h1 className="text-3xl md:text-5xl font-bold">

            Team Members

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            Start private realtime conversations.

          </p>

        </div>

        <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition">

          + Add Member

        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">

        {/* HEADER */}
        <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-white/10 text-gray-400 font-semibold">

          <div className="col-span-4">
            Member
          </div>

          <div className="col-span-3">
            Role
          </div>

          <div className="col-span-2">
            Status
          </div>

          <div className="col-span-3 text-center">
            Actions
          </div>

        </div>

        {/* BODY */}
        {members.map((member) => (

          <div
            key={member.id}
            className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-white/5 items-center hover:bg-white/5 transition"
          >

            {/* USER */}
            <div className="col-span-4 flex items-center gap-4">

              <img
                src={`https://i.pravatar.cc/150?u=${member.email}`}
                alt={member.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-purple-500"
              />

              <div>

                <h2 className="font-semibold text-2xl">
                  {member.name}
                </h2>

                <p className="text-sm text-gray-400">
                  {member.email}
                </p>

              </div>

            </div>

            {/* ROLE */}
            <div className="col-span-3">

              <span className="bg-purple-500/20 border border-purple-500/20 px-4 py-2 rounded-full text-sm">

                Team Member

              </span>

            </div>

            {/* STATUS */}
            <div className="col-span-2">

              <div className="flex items-center gap-2">

                <div
                  className={`w-3 h-3 rounded-full ${
                    onlineUsers.includes(
                      member.id
                    )
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                />

                <span className="text-sm">

                  {onlineUsers.includes(
                    member.id
                  )
                    ? "Online"
                    : "Offline"}

                </span>

              </div>

            </div>

            {/* ACTIONS */}
            <div className="col-span-3 flex justify-center gap-3">

              <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 transition">

                View

              </button>

              <button
                onClick={() =>
                  handleMessage(
                    member.id
                  )
                }
                className="bg-purple-500/20 border border-purple-500/20 px-4 py-2 rounded-xl hover:bg-purple-500/30 transition"
              >

                Message

              </button>

              <button className="bg-red-500/20 border border-red-500/20 px-4 py-2 rounded-xl hover:bg-red-500/30 transition">

                Remove

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Team;