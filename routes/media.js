const express = require("express");
const { uploadMedia, getUserMedia, deleteMedia } = require("../controllers/mediaController");
const authenticateJWT = require("../middleware/authenticateJWT"); 
const upload = require("../utils/multerCloudinary");

const router = express.Router();

// GET /media
router.get("/", authenticateJWT, getUserMedia);

// POST /media/upload
router.post("/upload", authenticateJWT, upload.single("file"), uploadMedia);

// DELETE /media/:id
router.delete("/:id", authenticateJWT, deleteMedia);

module.exports = router;
