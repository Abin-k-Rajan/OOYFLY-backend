const mongoose = require('mongoose')

const flightRouteCollection = new mongoose.Schema({
    airplane_id: Number,
    from: String,
    to: String,
    booked_seats: Array,
    airplane_name: String,
    duration: Number,
    departure: Date,
    arrival: Date,
    rate: Number
}, {
    collection: 'flightRouteCollection'
})


module.exports = mongoose.model('flightRouteCollection', flightRouteCollection)