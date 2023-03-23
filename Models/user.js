const mongoose = require('mongoose')


const userCollection = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'userCollection'
})


module.exports = mongoose.model('userCollection', userCollection)