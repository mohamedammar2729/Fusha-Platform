const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const homeSchema = new mongoose.Schema({
  categories: [categorySchema],
});

exports.Home = mongoose.model("home", homeSchema);
