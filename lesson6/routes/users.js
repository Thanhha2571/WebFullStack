const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/userModel');

const authorCheck = (req, res, next) => {
    const userRole = req.user.role;
    // console.log(userRole);
    if (userRole.includes('admin')) {
        next();
    }
    else {
        res.send("You are not an admin")
    }
};
userRouter.get('/', authorCheck, async (req, res) => {
    const users = await userModel.find({});
    res.send(users);
})

userRouter.get('/profile', async (req, res) => {
    res.send(req.user)
});

userRouter.patch('/profile/edit', async (req, res) => {
    req.user.username = req.body.username
    req.user.password = req.body.password
    await req.user.save()
    res.send(req.user);
});

// userRouter.delete('/admin/edit_user/:id', authorCheck, async (req, res) => {
//     const users = await userModel.find({})
//     const id = req.params.id;
//     const user = await userModel.findById(id);
//     await userModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
//     res.send(users);
// })
module.exports = { userRouter };