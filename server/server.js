const mongoose = require("mongoose")
const Document = require("./models/Document");
const MainNote = require("./models/MainNote");
const uuid = require('uuid');
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

  socket.on("get-document", async ({ documentId, pageId }) => {
    // console.log(pageId)
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data, pageId: pageId });
    });
  })


  socket.on("user-connected", async (pageId) => {
    console.log('user connected => ', pageId)
    const mainNote = await findOrCreateMainNote(pageId)
    // console.log(mainNote)
    socket.join(mainNote)
    socket.emit("fetch-notes", mainNote)
    socket.on("send-updated-notes", notesObject => {
      console.log('notes object from server $$$$$$$$', notesObject)
      // console.log(`receive-updated-notes-${pageId}`)
      io.emit(`receive-updated-notes-${pageId}`, notesObject);
    })
    socket.on("save-notes", async notesObject => {
      await MainNote.findByIdAndUpdate(pageId, { notes: notesObject.notes });
    });
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}


async function findOrCreateMainNote(id) {
  if (id == null) return

  const mainNote = await MainNote.findById(id)
  if (mainNote) return mainNote

  const newNote = {
    id: uuid.v4(),
    x: 200,
    y: 100
  };
  const initalNotesArray = [newNote];

  // Create the notes object
  return await MainNote.create({ _id: id, notes: initalNotesArray })
}
