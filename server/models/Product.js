const { Schema, model } = require("mongoose");

const Product = new Schema({
    name_uz: {
        type: String,
        required: true,
    },
    name_ru: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    photo: {
        type: Array,
        required: true,
    },
    desc_uz: {
        type: String,
        required: true,
    },
    desc_ru: {
        type: String,
        required: true,
    },
    inCart: {
        type: Number,
        default: 0
    },
    categoryId: {
        ref: "categories",
        type: Schema.Types.ObjectId,
    }
})
Product.index({
    name_uz: 'text', name_ru: 'text', desc_uz: 'text', desc_ru: 'text'
})
module.exports = model("Product", Product) 