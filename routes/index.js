const express = require('express');
const router = express.Router();
const axios = require("axios")

/* GET home page */
router.get('/', (req, res, next) => {
    axios.get("https://datos.madrid.es/egob/catalogo/212769-0-atencion-medica.json")
        .then(response => {
            console.log(response.data["@graph"].forEach((el) => {
                //let hospital = /^hospital$/
                if (el.title.startsWith('H')) console.log(el.title, el.location)
            }));
            res.render('index');
        })
});

module.exports = router