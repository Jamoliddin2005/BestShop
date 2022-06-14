const passport = require("passport");

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
  console.log(req.logout);
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
