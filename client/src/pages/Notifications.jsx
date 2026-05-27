import { useState } from "react";

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "New Message",
      message: "You received a new message from Alex.",
      time: "2 mins ago",
      unread: true,
      icon: "💬",
    },
    {
      id: 2,
      title: "Project Updated",
      message: "Dashboard UI project has been updated.",
      time: "10 mins ago",
      unread: true,
      icon: "🚀",
    },
    {
      id: 3,
      title: "Password Changed",
      message: "Your password was updated successfully.",
      time: "1 hour ago",
      unread: false,
      icon: "🔐",
    },
    {
      id: 4,
      title: "New Team Member",
      message: "Sophia joined your workspace.",
      time: "3 hours ago",
      unread: false,
      icon: "👥",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-4 md:p-6 pt-24 md:pt-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-400 mt-2">
            Stay updated with your latest activities.
          </p>
        </div>

        <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 rounded-2xl font-semibold hover:scale-105 transition">
          Mark all as read
        </button>
      </div>

      {/* NOTIFICATION LIST */}
      <div className="space-y-5">

        {notifications.map((item) => (
          <div
            key={item.id}
            className={`relative bg-white/5 border rounded-3xl p-6 backdrop-blur-xl transition hover:scale-[1.01]
              
              ${
                item.unread
                  ? "border-purple-500/40"
                  : "border-white/10"
              }
            `}
          >
            
            {/* UNREAD DOT */}
            {item.unread && (
              <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
            )}

            <div className="flex items-start gap-5">

              {/* ICON */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl shadow-lg">
                {item.icon}
              </div>

              {/* CONTENT */}
              <div className="flex-1">

                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">
                    {item.title}
                  </h2>

                  <span className="text-sm text-gray-400">
                    {item.time}
                  </span>
                </div>

                <p className="text-gray-400 mt-3 leading-relaxed">
                  {item.message}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 mt-5">

                  <button className="bg-purple-500/20 border border-purple-500/20 px-4 py-2 rounded-xl hover:bg-purple-500/30 transition">
                    View
                  </button>

                  <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 transition">
                    Dismiss
                  </button>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-32">
          
          <div className="text-8xl mb-6">
            🔔
          </div>

          <h2 className="text-3xl font-bold">
            No Notifications
          </h2>

          <p className="text-gray-400 mt-3">
            You're all caught up.
          </p>

        </div>
      )}
    </div>
  );
};

export default Notifications;