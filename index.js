const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
require('dotenv/config')

const app = express()

const user_routes = require('./Routes/users')
const airport_routes = require('./Routes/airport')
const flight_route = require('./Routes/flight_route')
const bodyParser = require('body-parser')


// MIDDLEWARE

app.use(cors())
app.use(bodyParser.json())
app.use('/api/user', user_routes)
app.use('/api/airport', airport_routes)
app.use('/api/flights', flight_route)

app.get("/", (req, res) => {
    res.send('Hello world');
})



mongoose.connect(
    'mongodb://127.0.0.1:27017/OOYFLY',
    { useNewUrlParser: true,  useUnifiedTopology: true },
    () => console.log('Connected to DB')
)


const { PORT=12345, LOCAL_ADDRESS='0.0.0.0'} = process.env

app.listen(PORT, LOCAL_ADDRESS, () => console.log(`Server listening on port ${PORT}`))