const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");

async function registerUser(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.redirect("/api/auth/login");
    } catch (e) {
        console.log(e);
        res.redirect("/api/auth/register");
    }
}

function loginUser(req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/api/auth/login",
        failureFlash: true
    })(req, res, next);
}

function logoutUser(req, res) {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect("/");
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
