exports.logout = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      req.logout((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    await new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Clear cookie
    res.clearCookie("connect.sid", { path: "/" });

    res.json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      message: "Logout failed. Please try again.",
    });
  }
};

// Get Current User 
exports.getCurrentUser = (req, res) => {
  try {
    if (req.isAuthenticated && req.isAuthenticated()) {
      res.json({
        success: true,
        user: req.user,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Not authenticated.",
      });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching user.",
    });
  }
};


