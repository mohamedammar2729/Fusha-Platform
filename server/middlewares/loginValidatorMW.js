// Purpose: Middleware to validate login request body.
// This file is used to validate the login request body.


const validator = require("../util/loginValidator");

module.exports = (req, res, next) => {
  let valid = validator(req.body);
  if (valid) {
    // req.valid = 1;
    next();
  } else {
    res.status(400).send("Bad request");
  }
};
