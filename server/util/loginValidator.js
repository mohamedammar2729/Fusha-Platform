//in this file, we will create a schema for the student object and validate it using the ajv library.

// import ajv
// it will return a class i am stored in a variable named Ajv
const Ajv = require("ajv");

// create a validator function to validate the schema

const schema = {
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
    },
    "password": {
      "type": "string",
      "pattern": "^(?=.*[A-Z])(?=.*[@#*+-]).{8,}$",
      "minLength": 8,
    },
  },
  "required": ["password", "email"],
};

const ajv1 = new Ajv();
let validator = ajv1.compile(schema);

module.exports = validator;

