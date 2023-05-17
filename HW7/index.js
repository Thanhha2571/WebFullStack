const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userRouter } = require('./routes/user');
const { userModel } = require('./models/userModel');
app.use (express.json());

const authenticationCheck = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, "Key");
    let { username } = decoded
    let user = await userModel.findOne({ username: username})
    if (user) {
        req.user = user
        next()
    }
    else {
        request.send("User not found")
    }
};
app.post ('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(username)
    const existUsername = await userModel.findOne({ username: username });
    if (existUsername) {
        res.send("User already registered")
    }
    else {
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password,salt);
        const user = await userModel.create({ username: username, password: hashPassword, role: ["user"]});
        console.log(username);
        console.log(user);
        res.send(user);
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username});
    if (user && bcrypt.compare(password, user.password)) {
        const token = jwt.sign({username: username}, "Key", {expiresIn: "1h"})
        res.send({token: token})
    }
})

app.use('/users', userRouter)
app.listen(3000)
console.log("Starting")