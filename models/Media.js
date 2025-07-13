const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userEmail: { type: String, required: true },
  filename: { type: String },          
  url: { type: String, required: true },  
  mimetype: { type: String, required: true },
  publicId: { type: String },        
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Media", mediaSchema);
