const express =
  require("express");

const cors =
  require("cors");

const dotenv =
  require("dotenv");

const http =
  require("http");

const { Server } =
  require("socket.io");

const authRoutes =
  require("./src/routes/authRoutes");

const messageRoutes =
  require("./src/routes/messageRoutes");

const conversationRoutes =
  require(
    "./src/routes/conversationRoutes"
  );

const userRoutes =
  require(
    "./src/routes/userRoutes"
  );

// CONFIG
dotenv.config();

const app = express();

const server =
  http.createServer(app);

// SOCKET SERVER
const io = new Server(
  server,
  {
    cors: {
      origin:
        "http://localhost:5173",

      methods: [
        "GET",
        "POST",
      ],
    },
  }
);

// ONLINE USERS
const onlineUsers = {};

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/messages",
  messageRoutes
);

app.use(
  "/api/conversations",
  conversationRoutes
);

app.use(
  "/api/users",
  userRoutes
);

// TEST ROUTE
app.get("/", (req, res) => {

  res.send(
    "API is running 🚀"
  );

});

// SOCKET CONNECTION
io.on(
  "connection",
  (socket) => {

    console.log(
      "User connected:",
      socket.id
    );

    // USER ONLINE
    socket.on(
      "user_online",
      (userId) => {

        onlineUsers[userId] =
          socket.id;

        console.log(
          "Online users:",
          Object.keys(
            onlineUsers
          )
        );

        // SEND ONLINE USERS
        io.emit(
          "online_users",
          Object.keys(
            onlineUsers
          )
        );

      }
    );

    // SEND MESSAGE
    socket.on(
      "send_message",
      (data) => {

        io.emit(
          "receive_message",
          data
        );

      }
    );

    // DISCONNECT
    socket.on(
      "disconnect",
      () => {

        console.log(
          "User disconnected"
        );

        // REMOVE USER
        for (
          const userId
          in onlineUsers
        ) {

          if (
            onlineUsers[userId] ===
            socket.id
          ) {

            delete onlineUsers[
              userId
            ];

          }

        }

        // UPDATE USERS
        io.emit(
          "online_users",
          Object.keys(
            onlineUsers
          )
        );

      }
    );

  }
);

// PORT
const PORT =
  process.env.PORT || 8000;

// START SERVER
server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});