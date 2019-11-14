const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const spot_registration_schema = new Schema({
    name: { type: String, require: true },
    contact: { type: String, require: true },
    address: { type: String, require: true },
    latitude: { type: String, require: true },
    longitude: { type: String, require: true }
}, {
    timestamps: true,
});
const spotregistration = mongoose.model('spotregistrationmodel', spot_registration_schema);
module.exports = spotregistration;