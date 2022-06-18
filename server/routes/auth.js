const router = require("express").Router();
const User = require("../models/User");

const {
  loginSuccess,
  loginFailed,
  logout,
  Google,
  GoogleCallBack,
  register,
  registerNumber,
} = require("../controllers/auth");

router.route("/login/success").get(loginSuccess);

router.route("/login/failed").get(loginFailed);

router.route("/login/logout").get(logout);

router.route("/google").get(Google);

router.route("/google/callback").get(GoogleCallBack);

router.route("/registerNumber").post(registerNumber);
// router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

// router.get(
//     "/github/callback",
//     passport.authenticate("github", {
//         successRedirect: CLIENT_URL,
//         failureRedirect: "/login/failed",
//     })
// );

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//     "/facebook/callback",
//     passport.authenticate("facebook", {
//         successRedirect: CLIENT_URL,
//         failureRedirect: "/login/failed",
//     })
// );

////// Register

router.route("/register").post(register);

module.exports = router;
