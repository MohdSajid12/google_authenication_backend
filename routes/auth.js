const express = require("express");
const passport = require("passport");
const { logout, getCurrentUser } = require("../controllers/authController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://google-authenication-frontend.vercel.app",
    successRedirect: "https://google-authenication-frontend.vercel.app",
  })
);


router.get("/logout", logout);

router.get('/current_user', isAuth, getCurrentUser);

module.exports = router;
