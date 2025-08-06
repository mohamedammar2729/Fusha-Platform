const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

exports.Avatar = mongoose.model("avatars", avatarSchema);
