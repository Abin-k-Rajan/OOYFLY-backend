const express = require('express')
const router = express.Router()
const airport_model = require('../Models/airport')


router.get('/get-aiports', async (req, res) => {
    airport_model.find({}, function(err, docs){
        res.json(docs)
    })
})


router.get('/get-airport-details', async (req, res) => {
    airport_model.find({id: req.query.id}, function(err, docs) {
        if (err) {
            res.status = 404
            res.send('Server error at get-airport-details')
        } else if (docs.length == 0 ) {
            res.send('Please select a valid airport')
        } 
        else {
            res.send(docs)
        }
    })
})


module.exports = router