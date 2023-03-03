const mongoose = require('mongoose')

const Categories = mongoose.Schema({
    name_uz: {
        type: String,
        required: true
    },
    name_ru: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('categorie', Categories)