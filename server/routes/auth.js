const router = require("express").Router();
const passport = require('passport')

// Google Authenticated
const {
  loginSuccess,
  loginFailed,
  Google,
  logout,
  GoogleCallBack,
} = require("../controllers/auth.google");
router.route("/login/success").get(loginSuccess);
router.route("/login/failed").get(loginFailed);
router.route("/login/logout").get(logout);
router.route("/google").get(Google);
router.route("/google/callback").get(GoogleCallBack);

// Github Authenticated

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);


// Phone Number Authenticated
const { NumberAuth, usersGet, userFind, PostPasswordSubmit } = require('../controllers/auth.phone');
const isAdmin = require("../middleware/isAdmin");

router.get("/users", isAdmin, usersGet)
router.get('/find', require('../controllers/authToken'))
router.post("/userFind", userFind)
router.post("/PostPasswordSubmit", PostPasswordSubmit)
router.post("/registerNumber", NumberAuth)
module.exports = router;