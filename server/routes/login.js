const express = require("express");

const router = express.Router();

const validateLogin = require("../middlewares/loginValidatorMW");

const { User } = require("../models/userModel");

const bcrypt = require("bcrypt");

const cookieOptions = {
  expires: new Date(Date.now() + 3600000),
  httpOnly: true, // the cookie can not be accessed by the client
  secure: process.env.NODE_ENV === "production" ? true : false, // only secure cookie in production
  sameSite: "Lax", // protect against CSRF attacks
};

const sendResponse = async (res, user, state) => {
  const token = user.generateAuthToken();
  const refershToken = user.generateRefreshToken();

  const updated = await User.findByIdAndUpdate(user._id, { refershToken: refershToken });
  console.log(updated, "updated");

  res.cookie("jwt", refershToken, cookieOptions);

  user.password = undefined;
  res.status(state).json({ status: "success", token, user });
};

router.post("/", async (req, res) => {
  try {
    const {email, password} = req.body;

    let user = await User.findOne({ email}).select("+password");
    if (!user) {
      return res.status(404).send("Invalid email or password");
    }

    let validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send("Invalid email or password...");
    }

    sendResponse(res, user, 201);

    //   return res.status(500).send("JWT secret key is not defined");
    // }
    // const token = user.generateAuthToken();

    // const refershToken = user.generateRefreshToken();

    // res.header("x-auth-token", token);
    // res.status(200).json(
    //   {
    //     token,
    //     user: {
    //       id: user._id,
    //       fname: user.firstname,
    //       lname: user.lastname,
    //       email: user.email,
    //     },
    //   },
    //   refershToken
    // );
  } catch (e) {

    console.error("Login error:", e);
    // Send specific validation errors
    if (e.errors) {
      const errors = Object.values(e.errors).map((err) => err.message);
      return res.status(400).json({ errors });
    }
    res.status(400).json({ error: e.message });
  }
});



module.exports = router;
