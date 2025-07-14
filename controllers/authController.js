exports.logout = async (req, res) => {
try {
    await API.get("/auth/logout");
  } catch (err) {
    console.error(err);
  }
  localStorage.removeItem("token");  
  setUser(null);
  navigate("/");
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


