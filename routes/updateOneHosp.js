const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital')

router.get('/', (req, res) => {


    Hospital.find()
        .then(hospitals => {
            hospitals[22].update({ time: Math.floor(Math.random() * (360 - 10) + 10) + " min " })
                .then(() => res.redirect("/auth/Hospital"));

        })
        .catch(err => {
            console.log(err)
        })




});
module.exports = router;