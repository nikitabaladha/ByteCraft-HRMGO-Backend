require("dotenv").config();

const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const connectDB = require("./config/db");

const cors = require("cors");

const app = express();

const Users = require("./models/User")

const io = require("socket.io")(3030, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//Socket.io
let users = [];
io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    const isUserExist = users.find((user) => user.userId === userId);
    if (!isUserExist) {
      const user = { userId, socketId: socket.id };
      users.push(user);
      io.emit("getUsers", users);
    }
  });

  socket.on('sendMessage', async({ senderId, receiverId, message, conversationId}) => {
    const receiver = users.find(user => user.userId === receiverId);
    const sender = users.find(user => user.userId === senderId)
    const user = await Users.findById(senderId)
    if(receiver) {
      io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
        senderId,
        receiverId,
        conversationId,
        message,
        user: { id: user._id, name: user.name, email: user.email}
      })
    }else {
      io.to(sender.socketId).emit('getMessage', {
        senderId,
        receiverId,
        conversationId,
        message,
        user: { id: user._id, name: user.name, email: user.email}
      })
    }
  })

  socket.on('disconnet', () => {
    users = users.filter(user => user.socketId !== socket.id)
    io.emit('getUsers', users)
  })
});

app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/Images", express.static(path.join(__dirname, "Images")));

app.use("/Documents", express.static(path.join(__dirname, "Documents")));

app.use(bodyParser.json());

const routes = require("./routes");

routes(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
