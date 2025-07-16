const Media = require("../models/Media");
const fs = require("fs");
const path = require("path");

exports.uploadMedia = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const media = new Media({
    user: req.user.id,              
    userEmail: req.user.email,      
    filename: req.file.filename,
    url: req.file.path,
    mimetype: req.file.mimetype,
  });

  await media.save();

  res.status(201).json({ success: true, media });
};

exports.getUserMedia = async (req, res) => {
  try {
    // const media = await Media.find({ user: req.user.id });
    const media = await Media.find({ user: req.user.id }).sort({ _id: -1 });  
    res.json({
      success: true,
      message: media.length === 0 ? "No media found for this user." : "Media fetched successfully.",
      media,
    });
  } catch (err) {
    console.error("Error fetching media:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch media.",
    });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findOne({ _id: req.params.id, user: req.user.id });

    if (!media) {
      return res.status(404).json({ success: false, message: "File not found" });
    }


    await media.deleteOne();

    res.json({ success: true, message: "File deleted successfully" });
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
