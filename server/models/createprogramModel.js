const mongoose = require("mongoose");

const createProgramSchema = new mongoose.Schema({
  numberOfPersons: {
    type: Number,
    required: true,
  },
  locate: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  typeOfProgram: {
    type: String,
    required: true,
  },
  selectedTripPlaces: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  register_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // New AI-generated trip fields (all optional)
  schedule: {
    type: Array,
    required: false,
  },
  tips: {
    type: Array,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    required: false,
    default: "upcoming",
  },
  isAIGenerated: {
    type: Boolean,
    required: false,
    default: false,
  },
  metadata: {
    type: Object,
    required: false,
  },
  places: {
    type: Array,
    required: false,
  },
});

exports.createProgram = mongoose.model("createProgram", createProgramSchema);
