const mongoose = require('mongoose');
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
        // type: mongoose.Schema.Types.ObjectId, ref: 'products' 
    }],
    cart:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'complaints'
    }]
    ,
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