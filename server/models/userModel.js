const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "email is not valid",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  userType: {
    type: String,
    required: true,
    enum: ["user", "seller", "admin"],
  },
  profileImage: {
    type: String, // Will store Base64 image data
  },
  refershToken: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ userid: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    { userid: this._id },
    process.env.JWT_REFERSH_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return refreshToken;
};

exports.User = mongoose.model("users", userSchema);
