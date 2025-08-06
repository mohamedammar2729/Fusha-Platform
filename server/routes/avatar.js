const express = require("express");

const router = express.Router();

const { Avatar } = require("../models/avatarModel");

router.get("/", async (req, res) => {
    try {
        // get all the avatar data
        const avatarData = await Avatar.find();
        res.json(avatarData);
    } catch (e) {
        res.status(500).send(e);

    }
});

module.exports = router;