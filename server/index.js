const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MemoryStore = require('memorystore')(session)
const passport = require("passport");
const app = express();

require("dotenv").config();
require("./helper/db")();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SessionSecretKey,
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 1000
    }, // 1 hour
  })
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
const Auth = require("./routes/auth");
const AddRoutes = require("./routes/Add");
const Products = require("./routes/Products");
const HeaderCarouselDelete = require("./routes/Delete");
const isAdmin = require("./middleware/isAdmin");

app.use("/auth", Auth);
app.use("/add", AddRoutes);
app.use("/products", Products)
app.use("/delete", isAdmin, HeaderCarouselDelete);

app.get("/isAdmin", async (req, res) => {
  return res.status(200).json({ data: req.session });
});

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
