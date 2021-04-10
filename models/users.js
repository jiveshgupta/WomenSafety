const mongoose = require('mongoose');
const admins = require('./admins');
const complaints = require('./complaints');
const usersSchema = mongoose.Schema({
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
    contactList:[{
        type: String 
    }],
    department: {
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

const users= mongoose.model('users', usersSchema);
module.exports = users;