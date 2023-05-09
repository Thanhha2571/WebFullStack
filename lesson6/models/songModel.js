const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/mindx')

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    access: [String]
});

const songModel = mongoose.model('songs', songSchema);

module.exports = { songModel };