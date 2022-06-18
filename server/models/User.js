const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  fullName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
  },
  avatar: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

module.exports = mongoose.model("User", Schema);
