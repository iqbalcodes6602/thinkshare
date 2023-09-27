const mongoose = require("mongoose")
const StickyNote = require("./models/StickyNote");
const Page = require("./models/Page");
const uuid = require('uuid');

require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// mongoose.connect('mongodb://127.0.0.1:27017/thinkshare', connectionParams);
// Replace 'mongoURI' with your actual MongoDB URI
mongoose.connect(mongoURI, connectionParams);
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  // You can take additional actions here if needed
});
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
  // You can start your application logic here
});

const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

io.on("connection", socket => {

  socket.on("get-document", async ({ stickyNoteId, pageId }) => {
    // console.log(pageId)
    const stickyNote = await findOrCreateStickyNote(stickyNoteId)
    socket.join(stickyNoteId)
    socket.emit("load-document", stickyNote.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(stickyNoteId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await StickyNote.findByIdAndUpdate(stickyNoteId, { data, pageId: pageId });
    });
  })


  socket.on("user-connected", async (pageId) => {
    console.log('user connected => ', pageId)
    const page = await findOrCreatePage(pageId)
    // console.log(Page)
    socket.join(page)
    socket.emit("fetch-notes", page)
    socket.on("send-updated-notes", notesObject => {
      console.log('notes object from server $$$$$$$$', notesObject)
      // console.log(`receive-updated-notes-${pageId}`)
      io.emit(`receive-updated-notes-${pageId}`, notesObject);
    })
    socket.on("save-notes", async notesObject => {
      await Page.findByIdAndUpdate(pageId, { notes: notesObject.notes });
    });
  })
})

async function findOrCreateStickyNote(id) {
  if (id == null) return

  const stickyNote = await StickyNote.findById(id)
  if (stickyNote) return stickyNote
  return await StickyNote.create({ _id: id, data: defaultValue })
}


async function findOrCreatePage(id) {
  if (id == null) return

  const page = await Page.findById(id)
  if (page) return page

  const colors = ["#9BEDFD", "#D8D0FE", "#FEE33A", "#FEC0D9"];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const newNote = {
    id: uuid.v4(),
    x: -100,
    y: -100,
    background: getRandomColor()
  };
  const initalNotesArray = [newNote];

  // Create the notes object
  return await Page.create({ _id: id, notes: initalNotesArray })
}
