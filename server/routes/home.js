const express = require("express");

const router = express.Router();

const {Home} = require("../models/homeModel");

router.get("/", async (req, res) => {
  try {
    const homeData = await Home.findOne();
    res.json(homeData);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const { categories } = req.body;
    const newHome = new Home({
      categories,
    });
    await newHome.save();
    res.status(201).json(newHome);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;