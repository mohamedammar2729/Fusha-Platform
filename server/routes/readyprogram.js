const express = require("express");

const router = express.Router();
const { readyProgram } = require("../models/readyprogramModel");

// const validateReadyProgram = require("../middlewares/readyprogramValidatorMW");

router.get("/", async (req, res) => {
  try {
    
    const readyPrograms = await readyProgram.find(); // sort by id in ascending order
    res.json(readyPrograms);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = router;
