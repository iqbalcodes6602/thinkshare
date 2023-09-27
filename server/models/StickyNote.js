const { Schema, model } = require("mongoose");

const StickyNote = new Schema({
  _id: String,
  data: Object,
  pageId: String, // Add this field to the schema
});

module.exports = model("StickyNote", StickyNote);
