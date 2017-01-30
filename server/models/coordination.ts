var mongoose = require('mongoose'),
    config   = require('../config/config'),
    Schema   = mongoose.Schema;

var CoordinationSchema = new Schema({
    course      : {type: String, required: true, trim: true},
    type        : {type: String, required: true, trim: true},
    coordinator : {type: String, required: true, trim: true},
    office_hour : {type: String, required: true, trim: true},
    link        : {type: String, required: true, trim: true}
});

module.exports = mongoose.model('Coordination', CoordinationSchema);