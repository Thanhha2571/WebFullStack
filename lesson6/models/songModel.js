const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Thanhha2571:ha2001@cluster30803.9qty4hw.mongodb.net/mindx')

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    access: [String]
    // userId: {type mongoose.Type}
});

const songModel = mongoose.model('songs', songSchema);

module.exports = { songModel };