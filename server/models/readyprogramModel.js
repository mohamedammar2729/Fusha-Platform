const mongoose = require("mongoose");


const readyProgramSchema = new mongoose.Schema({
  type_trip: {
    type: String,
    required: true,
  },
  person_num: {
    type: Number,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  images: {
    src1: String,
    src2: String,
    src3: String,
    src4: String,
  }
});

exports.readyProgram = mongoose.model("readyProgram", readyProgramSchema);