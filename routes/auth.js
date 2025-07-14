const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ success: false, message: "Invalid token" });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ success: false, message: "Authorization header missing" });
  }
}

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: process.env.FRONTEND_URL }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

router.get("/logout", (req, res) => {
  res.json({ success: true, message: "Logged out" });
});

router.get("/current_user", authenticateJWT, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;
