// We are importing the mongoose, because we want to create a schema.
const mongoose = require("mongoose");

// By building this, we are telling the mongoDB that I want this kind of structure in which, you'll be getting this schema.
const alienSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tech: {
    type: String,
    required: true,
  },
  sub: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Exporting via model handlers of route file.
module.exports = mongoose.model("Alien", alienSchema);
