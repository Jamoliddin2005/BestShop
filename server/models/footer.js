const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Footer = new Schema({
  name: {
    type: String,
  },
  hrefs: {
    type: String,
  },
  icon: {
    type: String,
  },
});

module.exports = mongoose.model("footer", Footer);
