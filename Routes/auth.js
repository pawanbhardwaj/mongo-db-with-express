const app = require('express')
const authRoute = app.Router()
const UserModel = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
authRoute.post('/login', async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) return res.send("Invalid Email")
    const passwordVerification = await bcrypt.compare(req.body.password, user.password)
    if (!passwordVerification) return res.send("Invalid password!!")
    const token = jwt.sign({ _id: user._id }, process.env.SECRET)
    user.password = undefined
    res.json({
        body: user,
        token: token
    })
})



module.exports = authRoute