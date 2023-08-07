const io = require("socket.io")(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", socket => {
    socket.on('get-document', documentId => {
        const data = ""
        socket.join(documentId)
        socket.emit('load-document', data)
        
        socket.on('send-changes', delta => {
            console.log(delta)
            socket.broadcast.emit('recieve-changes', delta)
        })
    })
    console.log("here")
})
console.log("running")