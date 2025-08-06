const express = require("express");

const router = express.Router();
const { createProgram } = require("../models/createprogramModel");

const createProgramValidator = require("../middlewares/createprogramValidatorMW");

router.post("/", createProgramValidator, async (req, res) => {
  try {
    const {
      numberOfPersons,
      locate,
      budget,
      typeOfProgram,
      selectedTripPlaces,
      images,
      // Add new optional fields
      schedule,
      tips,
      startDate,
      endDate,
      status,
      isAIGenerated,
      metadata,
      places,
    } = req.body;

    const newProgram = new createProgram({
      register_id: req.user.userid,
      numberOfPersons,
      locate,
      budget,
      typeOfProgram,
      selectedTripPlaces,
      images,
      // Add new optional fields if they exist
      ...(schedule && { schedule }),
      ...(tips && { tips }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(status && { status }),
      ...(isAIGenerated && { isAIGenerated }),
      ...(metadata && { metadata }),
      ...(places && { places }),
    });
    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", createProgramValidator, async (req, res) => {
  try {
    const programs = await createProgram.find({ register_id: req.user.userid });
    res.json(programs);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", createProgramValidator, async (req, res) => {
  try {
    const program = await createProgram.findOne({ _id: req.params.id });
    if (program.register_id.toString() !== req.user.userid) {
      return res.status(403).json({ error: "Access denied" });
    }
    res.json(program);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", createProgramValidator, async (req, res) => {
  try {
    const program = await createProgram.findOne({ _id: req.params.id });
    if (program.register_id.toString() !== req.user.userid) {
      return res.status(403).json({ error: "Access denied" });
    }
    // delete the program from mongodb
    await createProgram.deleteOne({ _id: req.params.id });
    res.json({ message: "Program deleted" });
  } catch (e) {
    res.status(500).send(e);
  }
});

// Add this route to your existing file

// Get all program IDs (for static site generation)
router.get("/all-ids", async (req, res) => {
  try {
    // Only fetch the _id field for efficiency
    const programs = await createProgram.find({}, { _id: 1 });
    const ids = programs.map((program) => program._id.toString());
    res.json({ ids });
  } catch (error) {
    console.error("Error fetching program IDs:", error);
    res.status(500).json({ error: "Failed to fetch program IDs" });
  }
});

module.exports = router;
