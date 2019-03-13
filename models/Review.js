const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newReview = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User"},
    hospital : {type: Schema.Types.ObjectId, ref: "Hospital"},
    review: String
}, {
    timestamps:true
})

const Review = mongoose.model("Review", newReview);

module.exports = Review;