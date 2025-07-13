require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const multer = require('multer');


dotenv.config();
require("./config/passport");

const app = express();

// Middlewares
app.use(
  cors({
    origin: "https://google-authenication-frontend.vercel.app",
    credentials: true,
  })
);


app.use(express.json());

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",   // IMPORTANT for cross-site cookies
      secure: true,       // IMPORTANT for HTTPS
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

// Connecting MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000 // 10 seconds
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/media", require("./routes/media"));

// Error handling middleware for multer and others
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Server Error" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
