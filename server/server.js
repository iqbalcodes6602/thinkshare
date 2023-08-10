const mongoose = require('mongoose');
const Note = require('./model/Note');
const io = require("socket.io")(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

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

const defaultValue = ""

io.on("connection", socket => {
    socket.on("get-document", async noteId => {
        const note = await findOrCreateNote(noteId)
        socket.join(noteId)
        socket.emit("load-document", note.data)

        socket.on("send-changes", delta => {
            socket.broadcast.to(noteId).emit("receive-changes", delta)
        })

        socket.on("save-document", async data => {
            await Note.findByIdAndUpdate(noteId, { data })
        })
    })
})

async function findOrCreateNote(id) {
    if (id == null) return

    const note = await Note.findById(id)
    if (note) return note
    return await Note.create({ _id: id, data: defaultValue })
}