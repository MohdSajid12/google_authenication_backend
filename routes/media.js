const express = require("express");
const { uploadMedia, getUserMedia ,deleteMedia} = require("../controllers/mediaController");
const upload = require("../utils/multer");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// GET /media
router.get("/", isAuth, getUserMedia);

// POST /media/upload
router.post("/upload", isAuth, upload.single("file"), uploadMedia);

// DELETE /media/:id
router.delete("/:id", isAuth, deleteMedia);

module.exports = router;
