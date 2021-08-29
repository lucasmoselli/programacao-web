const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/web?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')
mongoose.Promise = global.Promise;

module.exports = mongoose