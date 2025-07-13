const Media = require("../models/Media");
const fs = require("fs");
const path = require("path");

exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const media = new Media({
      user: req.user._id,
      userEmail: req.user.email,
      filename: req.file.filename,   
      url: req.file.path,             
      mimetype: req.file.mimetype,
      publicId: req.file.filename,  
    });

    await media.save();

    res.status(201).json({
      success: true,
      message: "File uploaded successfully.",
      media,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Failed to upload media." });
  }
};


exports.getUserMedia = async (req, res) => {
  try {
    const media = await Media.find({ user: req.user._id });

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
    const media = await Media.findOne({ _id: req.params.id, user: req.user._id });
    if (!media) {
      return res.status(404).json({ success: false, message: "File not found" });
    }
    const filePath = path.join(__dirname, "../uploads", req.user.email, media.filename);

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    } else {
      console.log(`File does not exist on disk: ${filePath}`);
    }

    await media.deleteOne();

    res.json({ success: true, message: "File deleted successfully" });
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
