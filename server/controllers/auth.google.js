const passport = require("passport");

exports.loginSuccess = async (req, res) => { 
  if (req.user) {
    return res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
};

exports.loginFailed = async (req, res) => {
  return res.status(401).json({
    success: false,
    message: "failure",
  });
};

exports.Google =
  ("/google", passport.authenticate("google", { scope: ["profile"] }));
exports.GoogleCallBack =
  ("/google/callback",
    passport.authenticate("google", {
      successRedirect: process.env.CLIENT_URL,
      failureRedirect: "/login/failed",
    }));
