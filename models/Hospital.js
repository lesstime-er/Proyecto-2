const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const hospitalSchema = new Schema({
    name: String,
    time: String,
<<<<<<< HEAD
    location: { latitude: Number, longitude: Number }
=======
    location: {latitude:Number, longitude: Number }
>>>>>>> 6749da3017851119558763609302a598ca827f63


}, {
    timestamps: true
});

hospitalSchema.index({ location: '2dsphere' });

const Hospital = mongoose.model("Hospital", hospitalSchema)
module.exports = Hospital;