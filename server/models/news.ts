var mongoose = require('mongoose'),
    config   = require('../config/config'),
    Schema   = mongoose.Schema;

var NewsSchema = new Schema({
    title     : {type: String, required: true, trim: true},
    link      : {type: String, required: true, trim: true},
    linkImage : {type: String, required: true, trim: true},
    infodata  : {type: String, required: true, trim: true}
});

module.exports = mongoose.model('News', NewsSchema);