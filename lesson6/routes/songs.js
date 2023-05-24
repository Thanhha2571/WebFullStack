const express = require('express');
const songRouter = express.Router();
const jwt = require('jsonwebtoken');
const { songModel } = require('../models/songModel');
const { userModel } = require('../models/userModel');
const authenCheck = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        let decoded = jwt.verify(token, "PRIVATE KEY");
        let { username} = decoded;
        let user = await userModel.findOne({ username: username}).populate('songs');
        if (user) {
            req.user = user;
            next();
        }
        else {
            res.send("User is not found");
        }  
    }catch (err) {
        res.status(401).send(err.message);
    }
}

songRouter.get('/', async (req, res) => {
    try {
        const songs = await songModel.find({})
        res.send(songs);
    } catch (err) {
        res.status(401).send(err.message)
    }

})

songRouter.get('/:id', authenCheck, async (req, res) => {
    const id = req.params.id;
    const song = await songModel.findById(id);
    res.send(song);
});

module.exports = { songRouter }