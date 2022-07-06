const passport = require("passport");
const bcrypt = require("bcrypt");
const Users = require("../models/User");

exports.loginSuccess = async (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        });
    }
};

exports.loginFailed = async (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
};

exports.logout = async (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
};

exports.Google =
    ("/google", passport.authenticate("google", { scope: ["profile"] }));
exports.GoogleCallBack =
    ("/google/callback",
        passport.authenticate("google", {
            successRedirect: process.env.CLIENT_URL,
            failureRedirect: "/login/failed",
        }));
