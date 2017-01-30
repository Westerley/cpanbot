var mongoose = require('mongoose'),
    config   = require('../config/config'),
    Schema   = mongoose.Schema;

var Homechema = new Schema({
    name : {type: String, required: true, trim: true},
});

module.exports = mongoose.model('Home', Homechema);