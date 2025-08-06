const express = require("express");

const router = express.Router();
const { places } = require("../models/placesModel");

// const validateplaces = require("../middlewares/placesValidatorMW");

router.get("/", async (req, res) => {
  try {
    const Places = await places.find();
    res.json(Places);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = router;
