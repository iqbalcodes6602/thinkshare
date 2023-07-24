const io = require("socket.io")(3001, {
    cors: {
        origin: "http://lcoalhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", socket => {})