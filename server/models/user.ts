var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    jwt      = require('jsonwebtoken'),
    config   = require('../config/config'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
    name      : {type: String, required: true, trim: true},
    email     : {type: String, unique: true, lowercase: true, required: true, trim: true},
    password  : {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

UserSchema.methods.generateToken = function (id, name, email) {
    return jwt.sign( {'id': id, 'name': name, 'email': email }, config.secret, {expiresIn: 10080});
};

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);