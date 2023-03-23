const mongoose = require('mongoose')


const airportCollection = new mongoose.Schema({
    id: Number,
    ident: String,
    name: String,
    municipality: String,
    iata_code: String
}, {
    collection: 'airportCollection'
})

module.exports = mongoose.model('airportCollection', airportCollection)