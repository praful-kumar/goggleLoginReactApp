const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: String,
    password: String,
    email:{
        type: String,
        required:true
    }

});
module.exports = mongoose.model('User', User);