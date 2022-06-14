const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const session = require("express-session");
const users = require("./models/User");
const app = express();

const initializePassport = require("./middleware/passport-config");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

require("dotenv").config();
require("./helper/db")();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
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

const AuthRoutes = require("./routes/auth");
const AddRoutes = require("./routes/Add");
const HeaderCarouselDelete = require("./routes/Delete");

app.use("/auth", AuthRoutes);
app.use("/add", AddRoutes);
app.use("/delete", HeaderCarouselDelete);

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
