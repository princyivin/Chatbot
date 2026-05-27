import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();

  const location = useLocation();

  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Chat",
      path: "/chat",
    },
    {
      name: "Analytics",
      path: "/analytics",
    },
    {
      name: "Settings",
      path: "/settings",
    },
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Notifications",
      path: "/notifications",
    },
    {
      name: "Search",
      path: "/search",
    },
    {
      name: "Team",
      path: "/team",
    },
    {
      name: "File Upload",
      path: "/upload",
    },
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-[#0b1120] border-b border-white/10 px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-purple-300">
          Nexus
        </h1>

        <button
          onClick={() => setOpen(!open)}
          className="text-3xl"
        >
          ☰
        </button>

      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-72 bg-[#0b1120]
          border-r border-white/10 p-6
          transform transition-transform duration-300
          
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* LOGO */}
        <div className="flex items-center justify-between mb-10">

          <h1 className="text-3xl font-bold text-purple-300">
            Nexus
          </h1>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-3xl"
          >
            ✕
          </button>

        </div>

        {/* MENU */}
        <nav className="pace-y-4 overflow-y-auto h-[calc(100vh-120px)] pr-2">

          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl transition text-white

                ${
                  location.pathname === item.path
                    ? "bg-purple-500/20 text-purple-300"
                    : "text-white"
                }
              `}
            >
              {item.name}
            </button>
          ))}

        </nav>

      </aside>
    </>
  );
}