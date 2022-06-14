const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    categoryId: {
        ref: "categories",
        type: Schema.Types.ObjectId,
    }
})

module.exports = mongoose.model("Product", Product)