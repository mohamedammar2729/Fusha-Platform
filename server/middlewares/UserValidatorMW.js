// in this file we will validate the user data
// we will use the validator function from the util/usersValidator.js file
// we will use the User model from the models/usersModel.js file

const validator = require("../util/usersValidator");

module.exports = (req, res, next) => {
  let valid = validator(req.body);
  if (valid) {
    // req.valid = 1;
    next();
  } else {
    res.status(400).send("Bad request");
  }
};

