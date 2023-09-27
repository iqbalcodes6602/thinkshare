const { Schema, model } = require("mongoose");

const Page = new Schema({
  _id: String,
  notes: Array, // Add this field to the schema
});

module.exports = model("Page", Page);
