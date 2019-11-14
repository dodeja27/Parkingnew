const router = require('express').Router();
const spot = require('../models/spot_registration');
router.get('/', function(req, res) {
    spot.find()
        .then(spots => res.json(spots))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/add', function(req, res) {
    const name = req.body.name;
    const contact = req.body.contact;
    const address = req.body.address;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const newspot = new spot({
        name,
        contact,
        address,
        latitude,
        longitude
    })
    newspot.save()
        .then(() => res.json('spot added'))
        .catch(err => res.status(400).json('Error: ' + err));

});
module.exports = router;