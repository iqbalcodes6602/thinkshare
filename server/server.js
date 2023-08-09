const Note = require("./model/Note");
const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

const initialVal = "";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

try {
  const mongoURL = process.env.MONGO_URL; // Access the environment variable
  mongoose.connect(mongoURL, connectionParams);
  console.log("Connected to database successfully");
} catch (error) {
  console.log(error);
  console.log("Could not connect to the database!");
}

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})


io.on("connection", socket => {
  socket.on("get-document", async mainDocId => {
    const mainDoc = await getMainDoc(mainDocId)
    socket.join(mainDocId)
    socket.emit("sync-document", mainDoc.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(mainDocId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Note.findByIdAndUpdate(mainDocId, { data })
    })
  })
})

async function getMainDoc(id) {
  if (id == null) return

  const mainDoc = await Note.findById(id)
  if (mainDoc) return mainDoc
  return await Note.create({ _id: id, data: initialVal })
}