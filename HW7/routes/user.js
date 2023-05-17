const express = require('express')
const userRouter = express.Router()

const { userModel} = require('../models/userModel');

userRouter.get('/', async (req, res) => {
    const users = await userModel.find({})
    res.send(users)
})
module.exports = { userRouter }