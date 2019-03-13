const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    comments: String,
    role: {
        type: String,
        enum: ["User", "Consejeria", "Hospital"],
        default: 'User'
    },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;