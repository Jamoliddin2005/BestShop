const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  fullName: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
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
  }
});

module.exports = mongoose.model("User", Schema);
