const mongoose = require('mongoose');
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
    displayPic:{
        type: String,
        default: ""
    }
});

const users= mongoose.model('users', usersSchema);
module.exports = users;