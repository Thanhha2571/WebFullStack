const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const filmRouter = express.Router();

filmRouter.get('/guest', (req, res) => {
    const film = JSON.parse(fs.readFileSync("film.json", "utf8"));
    const free_film = film.filter((film) => film.isFree === true);
    res.send(free_film);
})

const validateUser = filmRouter.use((req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.send("You have to login");
    }
    next();
    next();
})
filmRouter.get('/member', validateUser, (req, res) => {

    const film = JSON.parse(fs.readFileSync("film.json", "utf8"));
    const member_film = film.filter((film) => film.isFree === false);

    const users = JSON.parse(fs.readFileSync("user.json", "utf8"));
    const { username, password } = req.body;

    let user = users.find((user) => user.username === username)

    if (!user) {
        return res.status(401).send("User not found");
    }
    if (user.password !== password) {
        return res.status(401).send("Wrong password");
    }
    res.send(member_film);
})
module.exports = { filmRouter };