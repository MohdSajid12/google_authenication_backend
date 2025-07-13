const fs = require("fs");
const path = require("path");
const multer = require("multer");

const baseUploadDir = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check if user is authenticated
    if (!req.user || !req.user.email) {
      return cb(new Error("Unauthorized: User info missing in request"));
    }

    const userDir = path.join(baseUploadDir, req.user.email);

    // If folder does not exist, create it
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "video/mp4",
  "video/mov",
  "video/avi",
  "video/mpeg",
];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Only images and videos are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
