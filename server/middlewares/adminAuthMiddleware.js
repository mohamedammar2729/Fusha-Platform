const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.userid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.userType !== "admin") {
      return res
        .status(403)
        .json({ error: "Only admins can access this resource" });
    }

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};
