// import express
// it will return a function(req, res, next) => { return an object named app }
const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// import dotenv
require("dotenv").config();

const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path"); // Add this line

/* ======================================================================================= */

const userRouter = require("./routes/user");
const loginRouter = require("./routes/login");
const readyprogramRouter = require("./routes/readyprogram");
const placesRouter = require("./routes/places");
const homeRouter = require("./routes/home");
const avatarRouter = require("./routes/avatar");
const createprogramRouter = require("./routes/createprogram");
const refereshTokenRouter = require("./routes/refereshToken");
const aiRouter = require("./routes/AI");
const sellerPlaceRouter = require("./routes/sellerPlace");
const adminRouter = require("./routes/admin");

/* ===================== set connection to the mongo database ============================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connection successful to mongo database");
  })
  .catch((e) => {
    console.log(e);
  });
/* ========================= app is considered as a server ============================== */
const app = express();
const port = 5000;
/* ====================================================================================== */
// Increase payload size limit - ADD THIS BEFORE OTHER MIDDLEWARE
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL || "https://mohamedammar2729.github.io"],
//     credentials: true,
//   })
// );

app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" })); // Increase this limit too

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Define API routes
app.use("/api/user", userRouter); // use the user router
app.use("/api/login", loginRouter); // use the login router
app.use("/api/readyprogram", readyprogramRouter); // use the readyprogram router
app.use("/api/places", placesRouter); // use the places router
app.use("/api/createprogram", createprogramRouter); // use the createprogram router
app.use("/api/refereshtoken", refereshTokenRouter); // use the refereshToken router
app.use("/api/home", homeRouter);
app.use("/api/avatar", avatarRouter); // use the home router
app.use("/api/ai", aiRouter); // use the ai router
app.use("/api/seller-places", sellerPlaceRouter); // use the sellerPlace router
app.use("/api/admin", adminRouter); // Add this line
app.use("/api/seller-places", sellerPlaceRouter);

app.get("/", (req, res) => {
  res.send("API is Working");
});

// Add a catch-all route handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

/* ====================================================================================== */

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
