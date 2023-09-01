const { Schema, model } = require("mongoose");

const MainNote = new Schema({
  _id: String,
  notes: Array, // Add this field to the schema
});

module.exports = model("MainNote", MainNote);
