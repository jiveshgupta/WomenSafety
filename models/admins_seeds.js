const mongoose = require('mongoose');
const uri = `mongodb+srv://jivesh_2003:JiveshGupta@20@cluster0.7wh6p.mongodb.net/hack36?retryWrites=true&w=majority`

var count=0;
var connected=0;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, { autoReconnect: true })
    .then(() => { console.log('Connected With Database'); connected = 1; })
    .catch((err) => {
        console.log('Not Connected With Database');
        count++;
        console.log('trying to connect' + count + 'times');

        console.log(err);
    });


const admins= require('./admins');

const admin0= new admins({
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
    phone: '1234567890',
    bio: 'admin here'
});
admin0.save()
    .then(admin0 =>{
        console.log(admin0);
    })
    .catch(err=> {
        console.log(err);
    });
    // console.log('qwerty');