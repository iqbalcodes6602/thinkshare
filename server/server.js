const mongoose = require("mongoose")
const Note = require("./model/Note")

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
try {
  mongoose.connect('mongodb://127.0.0.1:27017/thinkshare', connectionParams);
  console.log("Connected to database successfully");
} catch (error) {
  console.log(error);
  console.log("Could not connect database!");
}

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const mainDoc = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("sync-document", mainDoc.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Note.findByIdAndUpdate(documentId, { data })
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const mainDoc = await Note.findById(id)
  if (mainDoc) return mainDoc
  return await Note.create({ _id: id, data: defaultValue })
}