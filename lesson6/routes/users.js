const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/userModel');
const { songModel } = require('../models/songModel');

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
userRouter.get('/',authorCheck, async (req, res) => {
    const users = await userModel.find({});
    res.send(users);
})

userRouter.get('/profile', async (req, res) => {
    res.send(req.user)
});

userRouter.patch('/profile/edit', async (req, res) => {
    const {song} = req.body
    const {username} = req.user
    console.log(username)
    
    // const user = await userModel.findOneAndUpdate({username: username}, {$push : {songs: song}});
    const user = await userModel.findOneAndUpdate({username}, {$push: {songs: song}}, {new: true})
    // Gui lai user duoc update cho client
    
    res.send(user)
});

// userRouter.patch('/profile/edit/:title', async (req, res) => {
//     const title = req.params.title
//     const song = await songModel.findOne({title: title}).populate({
//     // res.send(song)
//     const { username} = req.user
//     // const user = await userModel.findOneAndUpdate({username}, {$push: {songs: song}}, {new: true})
//     const user = await user
//     res.send(user)
// });
module.exports = { userRouter };
