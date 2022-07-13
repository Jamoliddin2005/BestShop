const { Schema, model } = require("mongoose");

const Users = new Schema({
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

module.exports = model("User", Users);
