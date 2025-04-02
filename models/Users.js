const mongoose = require('mongoose');

const UserSchema = new  mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String, 
        enum: ['user','admin'],
        default: 'user'
    }


},{timestamps: true})


const User = mongoose.model("users" , UserSchema);
module.exports = {
    User
}