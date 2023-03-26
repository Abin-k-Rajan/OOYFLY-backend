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

router.post('/book-seat', async (req, res) => {
    try {
        const new_booked_seats = []
        const flight_route_id = req.body.id
        const current_details = await flightRouteModel.find({"_id": flight_route_id}, function(err, docs) {
            docs[0].booked_seats.forEach(val => {
                new_booked_seats.push(val)
            });
            req.body.booked_seats.forEach(val => {
                new_booked_seats.push(val)
            })
            console.log(new_booked_seats)
        })
        // const new_booked_seats = current_details.booked_seats + req.body.booked_seats
        // console.log(current_details.data)
        flightRouteModel.findOneAndUpdate({"_id": flight_route_id}, {'booked_seats': new_booked_seats}, {upsert: true}, function(err, doc) {
            if (err) res.send(500, {error: err})
            res.send("Booked Seats Successguly")
        })
    } catch (err) {
        console.log(err)
    }
})


router.get('/get-flights', async (req, res) => {
    const date = new Date(req.query.date)
    const month = date.getMonth()
    const year = date.getFullYear()
    const day = date.getDate()
    flightRouteModel.find({from: req.query.from, to: req.query.to}, function (err, docs) {
        if (err) {
            res.status = err.status
            res.send('Server error at get-flights')
        } else if (docs.length == 0) {
            res.statusCode = 404
            res.send('No Flights Available')
        } else {
            let selected_routes = []
            docs.forEach(element => {
                let departure = new Date(element.departure)
                if (departure.getMonth() == month && departure.getFullYear() == year) {
                    if (Math.abs(day - departure.getDate()) <= 3) {
                        selected_routes.push(element)
                    }
                }
            });
            res.send(selected_routes)
        }
    })
})


router.get('/get-flight-detail', async (req, res) => {
    flightRouteModel.find({_id: req.query.id}, function (err, docs) {
        if (err) {
            res.statusCode = err.status
            res.send('Server error at get-flight-details')
        } else if (docs.length == 0) {

            res.sendStatus(401)
        } else {
            res.send(docs)
        }
    })
})




module.exports = router