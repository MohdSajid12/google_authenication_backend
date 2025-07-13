const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userEmail: { type: String }, 
  filename: { type: String, required: true },
  mimetype: { type: String },   
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Media", MediaSchema);
