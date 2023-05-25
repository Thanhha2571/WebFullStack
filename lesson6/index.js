const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const port = 4000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
const { userRouter } = require('./routes/users')
const { songRouter } = require('./routes/songs');
const { adminRouter } = require('./routes/admin');
const {userModel} = require('./models/userModel');
const {songModel} = require('./models/songModel');

app.get('/', (req, res) => {
    res.send("OK")
})

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

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username: username });

    if (user && bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: username}, "PRIVATE KEY", { expiresIn: "1h" })
        res.send({ token });   
    }
})

app.post ('/register', async (req, res) => {
    const { username, password} = req.body;
    const existUsername = await userModel.findOne({ username: username });
    if (existUsername) {
        res.send("User already registered")
    }
    else {
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password,salt);
        const user = await userModel.create({ username:username, password: hashPassword, role: ["user"]});
        res.send(user);
    }
})

app.get('/song/:id', async (req, res) => {
    const id = req.params.id;
    const song = await songModel.findById(id);
    // console.log(song);
    const songRole = song.access
    // console.log(songRole);
    if (songRole.includes("member")) {
        res.send("You have to login to listen this song");
    }
    else {
        res.send(song)
    }

})

app.use('/songs', songRouter);
app.use ('/user',authenCheck, userRouter)
app.use ('/admin',authenCheck,authorCheck, adminRouter);
app.listen(port);
console.log('Starting')

module.exports = app