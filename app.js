const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
var busboy = require('connect-busboy');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const mkdirp = require('mkdirp');
const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.use(express.static(path.join(__dirname, '/public')));
app.use(fileUpload());

const uri = `mongodb+srv://jivesh_2003:JiveshGupta@20@cluster0.7wh6p.mongodb.net/hack36?retryWrites=true&w=majority`

var count = 0;
var connected = 0;
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

const users = require('./models/users');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(cookieParser());


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));


app.get('/', async (req,res) => {
    res.render('root.ejs');
});


app.post('/signUp', async(req, res) => {
    
    res.cookie('isLogined',false);
    // req.session.isLogined=false;
    var userBody = req.body;
    if (userBody.password) {
        var newUser = new users(
            { name: userBody.name, email: userBody.email, password: userBody.password, phone: userBody.phone }
        );
        await newUser.save()
            .then(newUser => {
                console.log(`${newUser} added`);
            })
            .catch(err => {
                console.log(err);
            });
        res.redirect('/');
    }
    else {
        document.alert(`passwords do not match`);
    }
});

app.get('/login', async (req, res) => {
    
    var userQuery = req.query;
    try {
        var user = await users.findOne({ email: userQuery.email, password: userQuery.password }).exec();
        // console.log(`details ${userQuery.email} ${userQuery.password} hello `);
        if (user) {
            console.log('user is', user);
            
            res.cookie('isLogined',true);
            res.cookie('userId',user._id);
            console.log(req.cookies);
            res.redirect('/home');
        }
        else {
            // alert(`incorrect login datails`);
            res.send('login failed');
        }
    }
    catch (error) {
        return console.log('error', error);

    };
    console.log('after');
    // res.send('success');

});


app.get('/home', async (req, res) => {
    // console.log(req.cookies);
    var { isLogined = false } = req.cookies;
    // req.session.isLogined=false;
    // console.log(req.session.isLogined);
    if( isLogined !== 'true'){
        res.redirect('/');
    }
    else{
        var userId=req.cookies.userId;
        try{
            res.render('home.ejs');

    } catch (error) {
        console.log('error', error);
    }
}
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});