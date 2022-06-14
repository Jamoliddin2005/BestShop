const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  select: {
    type: String,
    required: true,
    default: "Spring"
  },
  photo: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("CarouselHome", Schema);
