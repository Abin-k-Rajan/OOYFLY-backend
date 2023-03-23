const mongoose = require('mongoose')


const Ticket = mongoose.Schema({
    user_id: String,
    passengers: Array,
    seats: Array,
    flight_route_id: String
}, {
    collection: 'ticketCollection'
})


module.exports = mongoose.model('ticketSchema', Ticket)