
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

router.get("/", async (req, res) => {
  // console.log("Cookies: ", req.cookies);
  try {
    const refreshToken = req.cookies.jwt;
     // Log all cookies
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(
      refreshToken,
      process.env.JWT_REFERSH_SECRET,
      async (err, user) => {
        if (err) return res.sendStatus(403);
        const existingUser = await User.findById(user.userid);
        if (!existingUser) return res.sendStatus(403);
        const token = existingUser.generateRefreshToken();
res.status(200).json({ accessToken: token, user: existingUser });
        // res.status(200).json({ token , data:{user:existingUser}});
      }
    );
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;

