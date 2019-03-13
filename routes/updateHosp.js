const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital')

router.get('/', (req, res) => {


    Hospital.find()
        .then(hospitals => {
            Promise.all(hospitals.map(hospital => hospital.update({ time: Math.floor(Math.random() * (360 - 10) + 10) + " min " }).then()))
                .then(() => res.redirect("/auth/Consejeria"));

        })
        .catch(err => {
            console.log(err)
        })




});
module.exports = router;