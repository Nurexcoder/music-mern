const mongoose = require("mongoose");
const User = require("./User");

const MusicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverAlbum: {
    type: String,
    required: true,
  },
  song: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = Book = mongoose.model("music", MusicSchema);
