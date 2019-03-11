const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const hospitalSchema = new Schema({
    name: String,
    //description: String,
    time: String,  
    location: { type: { type: String }, coordinates: [Number] }
  

}, {
  timestamps: true
});

hospitalSchema.index({ location: '2dsphere' });

const Hospital = mongoose.model("Hospital", hospitalSchema)
module.exports = Hospital;
