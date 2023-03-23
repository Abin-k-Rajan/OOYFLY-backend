const express = require('express')
const router = express.Router()
const user_model = require('../Models/user')
const ticket_model = require('../Models/ticket')


router.get('/get-users', async (req, res) => {
    try {
        const users = await user_model.find()
        res.json(users)
    }
    catch(err) {
        res.send(err)
    }
})


router.post('/login', async (req, res) => {
    user_model.find({email: req.body.email, password: req.body.password}, 'username', function(err, docs){
        if(!docs.length)
        {
            res.statusCode = 401
            res.send('UserName or Password is incorrect')
        }
        else {
            res.json(docs)
        }
    })
})



router.post('/create-user', (req, res) => {
    user_model.find({email: req.body.email}, function(err, docs) {
        if (err) {
            res.status(404)
            res.send('Server Error')
        }
        else if (docs.length) {
            res.status(409)
            res.send('User Already Exists')
        }
        else {
            const new_user = new user_model({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });
            new_user.save((err) => {
                if (err) {
                    res.send(err)
                }
                else
                {
                    res.json({'username': new_user.username})
                }
            })
        }
    })
})



router.post('/add-ticket', async(req, res)=> {
    const new_ticket = new ticket_model(req.body)
    new_ticket.save((err) => {
        if (err) {
            res.status(404)
            res.send('Error adding ticket')
        } else {
            res.send('Ticket added to user')
        }
    })
})


router.get('/get-tickets', async(req, res) => {
    const user_id = req.query.user_id
    ticket_model.find({user_id: user_id}, function(err, docs) {
        if (err) {
            res.status(404)
            res.send('Server Error at get-tickets')
        } else if (docs.length == 0) {
            res.send ('No Tickets Booked')
        } else {
            res.send(docs)
        }
    })
})



module.exports = router