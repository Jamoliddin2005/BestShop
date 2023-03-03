const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  post: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("CarouselHome", Schema);
