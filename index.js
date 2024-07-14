const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const {
  client,
  connectClient,
  insertDoc,
  findDocs,
  updateDoc,
  deleteDoc,
} = require("./Config/MongoConfig");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Update this to restrict to your specific client URL if needed
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

let problemStatementDisabled = true;
let workshopAreaDisabled = true;

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("a new user has connected", socket.id);
  socket.emit("messageFromServer", {
    message: "Hello from the server!",
  });

  // Emit an event to all connected clients (including the newly connected client)
  io.emit("broadcastMessage", {
    message: "A new user has joined the chat!",
  });

  socket.on("sendMessage", (data) => {
    console.log("Received message from client:", data.message);
    // Broadcast the received message to all clients
    io.emit("newMessage", {
      message: data.message,
    });
  });

  socket.on("unlockProblemStatement", () => {
    problemStatementDisabled = false;
    io.emit("enableProblemStatement");
  });

  socket.on("unlockWorkshopArea", () => {
    workshopAreaDisabled = false;
    io.emit("enableWorkshopArea");
  });

  socket.on("unlockQuestion", ({ questionId }) => {
    console.log(`Unlocked Question: ${questionId}`);
    io.emit("unlockQuestion", questionId);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

// Middleware setup
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
connectClient().catch(console.error);

// Serve static files from the 'public' directory
app.use(express.static("public"));

// MongoDB API routes
app.post("/api/insert", async (req, res) => {
  const newDoc = req.body;
  try {
    const result = await insertDoc("Workshop_Data", "Student_Details", newDoc);
      res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Error inserting document: " + error.message);
  }
});

app.get("/api/find", async (req, res) => {
  try {
    const results = await findDocs("Workshop_Data", "Student_Details");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error finding documents: " + error.message);
  }
});

app.put("/api/update", async (req, res) => {
  const { filter, update } = req.body;
  try {
    await updateDoc("Workshop_Data", "Student_Details", filter, update);
    res.status(200).send("Document updated");
  } catch (error) {
    res.status(500).send("Error updating document: " + error.message);
  }
});

app.delete("/api/delete", async (req, res) => {
  const filter = req.body;
  try {
    await deleteDoc("Workshop_Data", "Student_Details", filter);
    res.status(200).send("Document deleted");
  } catch (error) {
    res.status(500).send("Error deleting document: " + error.message);
  }
});

// Start the server
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server started at PORT Number: ${PORT}`);
});
