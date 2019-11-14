const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registration_schema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    contact: { type: String, require: true }
}, {
    timestamps: true,
});
const registraion = mongoose.model('registrationmodel', registration_schema);
module.exports = registraion;