const express = require('express')
const router = express.Router()
const flightRouteModel = require('../Models/flight_route')


router.post('/add-flight', async (req, res) => {
    try {
        const new_flight_route = new flightRouteModel(req.body)
        new_flight_route.save((err) => {
            if (err) {
                res.sendStatus(404)
            }
            else{
                res.send('Flight Route Added')
            }
        })
    }
    catch (err) {
        res.status(404)
        res.send(err)
    }
})


router.get('/get-flights', async (req, res) => {
    flightRouteModel.find({from: req.query.from, to: req.query.to}, function (err, docs) {
        if (err) {
            res.status = err.status
            res.send('Server error at get-flights')
        } else if (docs.length == 0) {
            res.send('No Flights Available')
        } else {
            res.send(docs)
        }
    })
})




module.exports = router