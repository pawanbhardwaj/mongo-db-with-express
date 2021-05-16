const app = require('express')

const router = app.Router()
const UserModel = require('../Models/User')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyjwt')
// post
router.post('/add', async (req, res) => {

    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).email().required(), password: Joi.string().min(5).required()
    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
        return res.send(error.details[0].message)
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    })
    // 1 Method
    // user.save(function (err, resp) {
    //     if (err) return res.send(err)
    //     res.send(resp)
    // })
    // 2 Method
    // user.save().then(resp => {
    //     res.send(resp)
    // }).catch(err => {
    //     res.send(err)
    // })
    // 3 method

    const save = await user.save();

    try {
        res.send(save)
    } catch (e) {
        res.send(e)
    }
}

)
//get all users

router.get('/get-all', verifyToken, async (req, res) => {
    const users = await UserModel.find();
    try {
        res.send(users)
    } catch (e) {
        res.send(e)
    }

})
// get user by id
router.get('/get/:id', async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)

    try {
        res.send(user)
    } catch (e) {
        res.send(e)
    }

})
// delete the document from mongoDB
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.remove({
        _id: id
    })
    try {
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})
// update the document
router.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.update(
        { _id: id },
        {
            $set: req.body
        }
    )
    try {
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})
// get token
router.get('/token', (req, res) => {
    const token = jwt.sign({ _id: 1212122 }, process.env.SECRET)
    res.send(token)
})

module.exports = router