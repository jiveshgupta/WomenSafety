const mongoose = require('mongoose');
const users = require('./users');
const complaints = require('./complaints');
const adminsSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    phone:{
        type: String
    },
    department:{
        type: String
    },
    displayPic:{
        type: String,
        default: ""
    },
    coverPic:{
        type: String,
        default: ""
    },
    bio:{
        type: String,
        default: 'bio'
    }
});

const admins= mongoose.model('admins', adminsSchema);
module.exports = admins;