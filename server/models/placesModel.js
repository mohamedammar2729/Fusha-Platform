const mongoose = require("mongoose");

const tripPlacesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  image: {
    src: String,
  },
  category: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

exports.places = mongoose.model("places", tripPlacesSchema);