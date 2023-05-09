const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const port = 3000;
app.use(express.json());
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
   
    const token = req.headers.authorization.split(" ")[1]
    let decoded = jwt.verify(token, "PRIVATE KEY");
    let { username} = decoded;
    let user = await userModel.findOne({ username: username});
    if (user) {
        req.user = user;
        next();
    }
    else {
        res.send("User is not found");
    }
}
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let user = await userModel.findOne({ username: username });

    if (!user) {
        return res.status(401).send("User not found");
    }
    if (user.password !== password) {
        return res.status(401).send("Password is incorrect");
    }
    const token = jwt.sign({ username: username}, "PRIVATE KEY", { expiresIn: "1h" })

    res.send({ token });
})

app.post ('/register', async (req, res) => {
    const { username, password } = req.body;
    const existUsername = await userModel.findOne({ username: username });
    if (existUsername) {
        res.send("User already registered")
    }
    else {
        const user = await userModel.create({ username:username, password: password, roles: ["user"]});
        res.send(user);
    }
})


// app.delete('/admin/edit_user/:id', authenCheck, authorCheck, async (req, res) => {
//     const id = req.params.id;
//     const user = await userModel.findById(id);
//     await userModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
//     const users = await userModel.find({})
//     res.send(users);
// })

// app.post('/admin/edit_song/add',authenCheck,authorCheck, async (req, res) => {
//     const {title,artist, access} = req.body;
//     let existTitle = await songModel.findOne({title: title})
//     if (existTitle) {
//         res.send("Song already exists");
//     }
//     else {
//         const song = await songModel.create({ title: title, artist: artist, access: access});
//         res.send(song);
//     }
// })

// app.delete('/admin/edit_song/:id',authenCheck,authorCheck, async (req, res) =>{
//     const id = req.params.id;
//     const song = await songModel.findById(id);
//     await songModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
//     const songs = await songModel.find({})
//     res.send(songs)
// })
// app.patch ('/admin/edit_song/:id',authenCheck,authorCheck, async (req, res) =>{
//     const { title, artist, access } = req.body;
//     const song = await songModel.findById(id);
//     song.title = title;
//     song.artist = artist;
//     song.access = access;
//     await song.save();
//     res.send(song)
// })

app.use('/song', songRouter);
app.use ('/user',authenCheck, userRouter)
app.use ('/admin',authenCheck, authorCheck, adminRouter);
app.listen(port);
console.log('Starting')