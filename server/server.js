const mongoose = require("mongoose")
const Document = require("./Document")

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

  socket.on("get-document", async ({documentId, pageId}) => {
    console.log(pageId)
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    // socket.on("save-document", async data => {
    //   await Document.findByIdAndUpdate(documentId, { data })
    // })
    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data, pageId: pageId });
    });    
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}
