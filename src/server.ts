import http from "http";
import { Server } from "socket.io";

import { connectDB } from "./config/database.js"; // এখানে .js যুক্ত করা হয়েছে
import app from "./app.js";
import chalk from "chalk";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(
    chalk.blue.bold("🚀 Server is running!") + "\n" +
    chalk.blue("📍 URL: ") + chalk.underline(`http://localhost:${PORT}`) + "\n" +
    chalk.gray("-------------------------------------------")
  );
  });
});