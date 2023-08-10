const { Schema, model } = require("mongoose")

const MainNote = new Schema({
    _id: String,
    notes: Array,
})

module.exports = model("MainNote", MainNote)