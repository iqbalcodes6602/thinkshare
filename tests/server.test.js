const io = require("socket.io-client");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const server = require("../server");
const { object } = require("webidl-conversions");

let mongoServer;
let socket;
mongoURI='mongodb://127.0.0.1:27017/thinkshare'

beforeAll(async () => {

    // Connect to the MongoDB server
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// afterAll(async () => {
//     // Close the MongoDB connection and stop the in-memory server
//     await mongoose.disconnect();
//     // await mongoServer.stop();s
// });

beforeEach(() => {
    // Create a new socket.io client before each test
    socket = io("http://localhost:3001", {
        forceNew: true,
    });
});

afterEach(() => {
    // Disconnect the socket.io client after each test
    socket.close();
});

describe("Socket.io tests", () => {
    test("Test socket.io connection", (done) => {
        // Test if socket.io connection is successful
        socket.on("connect", () => {
            expect(socket.connected).toBe(true);
            done();
        });
    });

    test("Test get-document event", (done) => {
        // Emit a "get-document" event and listen for "load-document" event
        socket.emit("get-document", { documentId: "7ba9406d-0c6e-46c4-af7b-cf16ebf07aca"
        , pageId: "5cfae657-b690-4f9b-8712-029d85aea561" });
        socket.on("load-document", (document) => {
          expect(document).toBeDefined();
          expect(document.data).toBe(object); // Change this based on your expectations
          done();
        });
      }, 10000); // Set a timeout of 10 seconds (or adjust as needed)
      

    // Add more test cases for your socket.io events here

    // Example:
    // test("Test send-changes event", (done) => {
    //   // Emit a "send-changes" event and test the response
    //   // ...
    // });

    // test("Test user-connected event", (done) => {
    //   // Emit a "user-connected" event and test the response
    //   // ...
    // });
});

test("Example test", () => {
    expect(true).toBe(true);
});

