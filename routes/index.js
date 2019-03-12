
const express = require('express');
const router  = express.Router();
const Hospital = require('../models/Hospital')

/* GET home page */
router.get('/', (req, res) => {

  Hospital.find()
  .then(hospitals => {
    res.render('index', {result: JSON.stringify(hospitals)});
  })
  .catch(err => {
    console.log(err)
  })
  
});

router.post('/hospitals', (req, res) => {

  const {name, time,latitude,longitude} = req.body

  let location = {
    type: "Point",
    location: [longitude, latitude]
  }

 


})

module.exports = router;