const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
})



module.exports = mongoose.model('User', Schema)