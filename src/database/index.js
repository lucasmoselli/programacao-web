const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lucas:12345@cluster0.x7lk0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.Promise = global.Promise;

module.exports = mongoose