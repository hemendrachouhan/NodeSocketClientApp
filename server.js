const express = require("express");
const app = express();
const router = express.Router();
const server = require("http").Server(app);
const io = require("socket.io")(server);

//MIDDLEWARE
app.use("/api", function (req, res) {
  res.send("/api route");
});

// Send message for default URL
app.get("/", function (req, res) {
  // res.send("connected on port:3000");
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  console.log("user connected");

  socket.on("messages-sent", function (data) {
    io.emit("sent", { msg: data });
  });
});

server.listen(3000, function () {
  console.log("server connected..");
});
