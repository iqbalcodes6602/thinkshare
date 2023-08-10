const { Schema, model } = require("mongoose")

const Note = new Schema({
    _id: String,
    data: Object,
})

module.exports = model("Note", Note)