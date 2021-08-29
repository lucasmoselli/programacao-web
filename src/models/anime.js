const mongoose = require('../database');
const bcrypt = require('bcryptjs')

const AnimeSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        unique: true,
    },
    img:{
        type: String,
        require: true,
        unique: false,
    }
})

const Anime = mongoose.model('Anime', AnimeSchema, 'Anime')

module.exports = Anime