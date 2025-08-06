// import crypto
const crypto = require('crypto');

//generate a random keys

const key1 = crypto.randomBytes(64).toString('hex');

const key2 = crypto.randomBytes(32).toString('hex');