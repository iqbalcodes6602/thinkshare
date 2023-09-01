const { Schema, model } = require("mongoose");

const Document = new Schema({
  _id: String,
  data: Object,
  pageId: String, // Add this field to the schema
});

module.exports = model("Document", Document);
