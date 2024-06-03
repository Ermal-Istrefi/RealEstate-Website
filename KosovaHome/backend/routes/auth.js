const express = require("express");
const router = express.Router();
const { checkNotAuthenticated } = require("../middleware/auth");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

router.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login.html");
});

router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.html");
});

router.post("/login", checkNotAuthenticated, loginUser);

router.post("/register", checkNotAuthenticated, registerUser);

router.delete("/logout", logoutUser);

module.exports = router;
