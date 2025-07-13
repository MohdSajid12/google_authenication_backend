module.exports = (req, res, next) => {
  try {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ success: false, message: "Unauthorized" });
  } catch (error) {
    console.error("Error :", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
