const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const session = require('express-session');
const passport = require("passport");
const app = express();

require("dotenv").config();
require("./helper/db")();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
// );

app.use(session({
  secret: process.env.SessionSecretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

require("./middleware/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
const Auth = require("./routes/auth");
const AddRoutes = require("./routes/Add");
const HeaderCarouselDelete = require("./routes/Delete");
app.use("/auth", Auth);
app.use("/add", AddRoutes);
app.use("/delete", HeaderCarouselDelete)
app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});