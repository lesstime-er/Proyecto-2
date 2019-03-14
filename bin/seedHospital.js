require("dotenv").config();
const mongoose = require("mongoose")
const Hospital = require("../models/Hospital");
const axios = require("axios")



mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(x => {

        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
        return Hospital.deleteMany();

    })
    .then(() => {
        return axios.get("https://datos.madrid.es/egob/catalogo/212769-0-atencion-medica.json")
            .then(response => {
                let hospitals = response.data["@graph"].map((el) => {

                    if (el.title.startsWith('H')) {
                        let arrHosp = { name: el.title, location: el.location, time: Math.floor(Math.random() * (360 - 10) + 10) + " min ", review: el.review }

                        return arrHosp;
                    }
                })
                hospitals = hospitals.filter(hospital => {
                    if (hospital) {
                        return true
                    }
                    return false
                })

                return Hospital.insertMany(hospitals).then(console.log)

            })
    })
    .catch(err => console.log(err))
    .then(hosp => mongoose.connection.close())
    .catch(err => {
        console.error('Error connecting to mongo', err)

    });