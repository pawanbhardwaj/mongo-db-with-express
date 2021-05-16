const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const env = require('dotenv/config')
app.use(express.json())
const UserRouter = require('./Routes/users')
const authRouter = require('./Routes/auth')
app.use('/api/', UserRouter)
app.use('/api/auth', authRouter)
app.listen(port, () => console.log(`Example app listening on port port!`))

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {


    if (!err) {
        console.log("connected")

    } else {
        console.log(err)
    }
})
