const mongoose = require("mongoose")
const Hospital = require("../models/Hospital");
const axios = require("axios")



mongoose.connect('mongodb://localhost/lesstime-er', { useNewUrlParser: true })
    .then(x => {
        
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
        return Hospital.deleteMany();
        
    })
    .then(() => {
        return axios.get("https://datos.madrid.es/egob/catalogo/212769-0-atencion-medica.json")
            .then(response => {
                let hospitals = response.data["@graph"].map((el) => {

                    if (el.title.startsWith('H')) {
                        let arrHosp = { name: el.title, location: el.location, time:"180 min" }

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


 