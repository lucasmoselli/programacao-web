const internal = require('stream')
const mongoose = require('../database')

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        require: true,
        lowecase: true,
    },
    password:{
        type: String,
        require: true,
        select: false,
    },
});

const User = mongoose.model('User', UserSchema, 'User')

module.exports = User;