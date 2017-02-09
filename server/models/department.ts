var mongoose = require('mongoose'),
    config   = require('../config/config'),
    Schema   = mongoose.Schema;

var InformationSchema = new Schema({
    question: {type: String, required: true, trim: true},
    answer  : {type: String, required: true, trim: true}
});

var DepartmentSchema = new Schema({
    name            : {type: String, required: true, trim: true},
    description     : {type: String, required: true, trim: true},
    informations    : [ InformationSchema ]
});

module.exports = mongoose.model('Department', DepartmentSchema);
