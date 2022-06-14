const mongoose = require('mongoose')

const Categories = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('categorie', Categories)