const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const filmRouter = express.Router();


filmRouter.get('/film', (req, res) => {
    const film = JSON.parse(fs.readFileSync("film.json", "utf8"));
    res.send(film);
})

filmRouter.get('/film/:id', (req, res) => {
    const film = JSON.parse(fs.readFileSync("film.json", "utf8"));
    const id = req.params.id;
    if (film[id-1].isFree === true) {
        res.send(film[id-1]);
    }
    else{
        res.send("You have to login to watch this film");
    }
    
});

const validateUser = filmRouter.use((req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.send("You have to enter a username and/or password");
    }
    next();
    next();
})
filmRouter.get('/login/film/:id', validateUser, (req, res) => {

    const film = JSON.parse(fs.readFileSync("film.json", "utf8"));

    const users = JSON.parse(fs.readFileSync("user.json", "utf8"));
    const { username, password } = req.body;

    let user = users.find((user) => user.username === username)

    if (!user) {
        return res.status(401).send("User not found");
    }
    if (user.password !== password) {
        return res.status(401).send("Wrong password");
    }

    const id = req.params.id;
    res.send(film[id-1])
})
const authorization = filmRouter.use((req, res, next) => {
    const users = JSON.parse(fs.readFileSync("user.json", "utf8"));
    const { username } = req.body;
    if  ( username !== "Admin" ) {
        res.send("You are not an admin")
    } 
    next();
    next();
})
filmRouter.get ('/admin/film', authorization, (req, res) => {
    const film = JSON.parse(fs.readFileSync("film.json", "utf8"));
    const { username, password } = req.body;
    res.send(film)
})
module.exports = { filmRouter };