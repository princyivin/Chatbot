import { useParams }
  from "react-router-dom";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";

import { io }
  from "socket.io-client";

import { jwtDecode }
  from "jwt-decode";

// SOCKET
const socket = io(
  "http://localhost:8000"
);

export default function Chat() {

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  const messagesEndRef =
    useRef(null);

  // TOKEN
  const token =
    localStorage.getItem(
      "token"
    );

  // NO TOKEN
  if (!token) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1326] text-white text-2xl">

        Please login first

      </div>
    );

  }

  // DECODE JWT
  const decoded =
    jwtDecode(token);

  const senderId =
    decoded.id;

  // ROUTE PARAMS
  const params =
    useParams();

  const conversationId =
    params.conversationId;

  // FETCH MESSAGES
  const fetchMessages =
    async () => {

      // VERY IMPORTANT
      if (!conversationId)
        return;

      try {

        const res =
          await axios.get(
            `http://localhost:8000/api/messages/${conversationId}`
          );

        setMessages(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

  };

  // LOAD MESSAGES
  useEffect(() => {

    fetchMessages();

  }, [conversationId]);

  // SOCKET LISTENER
  useEffect(() => {

    socket.on(
      "receive_message",
      (data) => {

        setMessages(
          (prev) => [
            ...prev,
            {
              ...data,
              id:
                Date.now() +
                Math.random(),
            },
          ]
        );

      }
    );

    return () => {

      socket.off(
        "receive_message"
      );

    };

  }, []);

  // AUTO SCROLL
  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth",
      });

  }, [messages]);

  // SEND MESSAGE
  const handleSend =
    async () => {

      if (!text.trim())
        return;

      // SAFETY
      if (!conversationId) {

        alert(
          "Please open a conversation first"
        );

        return;

      }

      const newMessage = {
        text,
        senderId,
        conversationId,
      };

      try {

        // SAVE DATABASE
        await axios.post(
          "http://localhost:8000/api/messages/send",
          newMessage
        );

        // SOCKET REALTIME
        socket.emit(
          "send_message",
          newMessage
        );

        setText("");

      } catch (error) {

        console.log(error);

      }

  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-white flex">

      {/* CHAT AREA */}
      <main className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <div className="border-b border-white/10 p-6 flex justify-between items-center backdrop-blur-xl bg-white/5">

          <div>

            <h1 className="text-2xl font-bold">
              Nexus Realtime Chat
            </h1>

            <p className="text-white/50 text-sm mt-1">

              {conversationId
                ? "Private conversation"
                : "Select a conversation from Team page"}

            </p>

          </div>

          <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center font-bold text-black">

            {decoded.name
              ?.charAt(0)
              ?.toUpperCase() || "P"}

          </div>

        </div>

        {/* EMPTY STATE */}
        {!conversationId ? (

          <div className="flex-1 flex items-center justify-center text-white/40 text-2xl">

            Open Team page and click Message 🚀

          </div>

        ) : (

          <>
            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">

              {messages.length === 0 ? (

                <div className="text-center text-white/40 mt-20">

                  No messages yet

                </div>

              ) : (

                messages.map((msg) => (

                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId ===
                      senderId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-xl px-6 py-4 rounded-3xl shadow-lg break-words ${
                        msg.senderId ===
                        senderId
                          ? "bg-purple-500 rounded-br-sm"
                          : "bg-white/5 border border-white/10 rounded-tl-sm"
                      }`}
                    >

                      {msg.text}

                    </div>

                  </div>

                ))

              )}

              <div ref={messagesEndRef} />

            </div>

            {/* INPUT */}
            <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-xl">

              <div className="flex gap-4">

                <input
                  type="text"
                  placeholder="Type your message..."
                  value={text}
                  onChange={(e) =>
                    setText(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {

                    if (
                      e.key === "Enter"
                    ) {

                      handleSend();

                    }

                  }}
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-400"
                />

                <button
                  onClick={handleSend}
                  className="bg-purple-500 hover:bg-purple-600 transition px-8 rounded-2xl font-semibold"
                >

                  Send

                </button>

              </div>

            </div>
          </>

        )}

      </main>

    </div>
  );
}