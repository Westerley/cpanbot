var mongoose = require('mongoose'),
    config   = require('../config/config'),
    Schema   = mongoose.Schema;

var PhoneSchema = new Schema({
    name      : {type: String, required: true, trim: true},
    telephone : {type: String, required: true, trim: true},
    option    : {type: String, required: true, trim: true}
});

module.exports = mongoose.model('Phone', PhoneSchema);