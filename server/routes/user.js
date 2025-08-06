
const express = require("express");
const router = express.Router();
const validateUser = require("../middlewares/UserValidatorMW");
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");

// set cookiesOptions
const cookieOptions = {
  expires: new Date(Date.now() + 3600000),
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: "Lax",
};

const sendResponse = async (res, user, state) => {
  const token = user.generateAuthToken();
  const refershToken = user.generateRefreshToken();

  const updated = await User.findByIdAndUpdate(user._id, {
    refershToken: refershToken,
  });

  res.cookie("jwt", refershToken, cookieOptions);

  user.password = undefined;
  res.status(state).json({ status: "success", token, user });
};

// Add middleware for handling image data validation
const validateProfileImage = (req, res, next) => {
  // If no image is provided, just continue
  if (!req.body.profileImage) {
    return next();
  }

  // Basic validation for base64 image (check if it's a valid format)
  const base64Regex = /^data:image\/(jpeg|jpg|png|gif);base64,/;
  if (!base64Regex.test(req.body.profileImage)) {
    return res.status(400).send("Invalid image format");
  }

  // Check if image size is reasonable (less than 1MB after base64 encoding)
  // Base64 size = (original size * 4/3) + some overhead
  const base64WithoutPrefix = req.body.profileImage.split(",")[1];
  const sizeInBytes = Buffer.from(base64WithoutPrefix, "base64").length;
  if (sizeInBytes > 1024 * 1024) {
    // 1MB limit
    return res.status(400).send("Image size too large");
  }

  next();
};

router.post("/", validateUser, validateProfileImage, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (user) {
      return res.status(400).send("User already registered");
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      city: req.body.city,
      email: req.body.email,
      password: hashedPassword,
      userType: req.body.userType,
      profileImage: req.body.profileImage || "", // Save the base64 image data
      refershToken: "",
    });

    sendResponse(res, newUser, 201);
  } catch (e) {
    console.error("Registration error:", e);
    for (let i in e.errors) {
      console.log(e.errors[i].message);
    }
    res.status(400).send("Bad request .............");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (e) {
    res.status
      .status(500)
      .send("Internal server error. Please try again later.");
  }
});

router.put("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id).select("+password");
    if (!user) {
      return res.status(404).send("User not found");
    }

    let hashedPassword = req.body.password;
    if (req.body.password == user.password) {
      hashedPassword = req.body.password;
    } else {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }
    // Update the user object
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.city = req.body.city;
    user.email = req.body.email;
    user.password = hashedPassword;
    user.userType = req.body.userType;
    user.profileImage = req.body.profileImage || ""; // Save the base64 image data

    await user.save();
    sendResponse(res, user, 200);
  } catch (e) {
    console.error("Update error:", e);
    res.status(400).send("Bad request");
  }
});

module.exports = router;
