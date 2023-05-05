const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const userRouter = express.Router();

const verifyAccount = ((req, res, next) => {
    const users = JSON.parse(fs.readFileSync("user.json","utf8"));
    const { username } = req.body;
    const existUsername = users.find((user) => user.username === username);
    if ( existUsername) {
        res.send("Username is  already exists")
    }
    else {
        next();
    }
    
})
userRouter.post('/signup',verifyAccount, (req, res) => {
    const users = JSON.parse(fs.readFileSync("user.json","utf8"));
    const data =  req.body;
    users.push(data);
    fs.writeFileSync("user.json", JSON.stringify(users));
    res.send("Success")
})
module.exports = { userRouter };