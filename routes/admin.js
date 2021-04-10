const express = require("express");
const router= express.Router();
const path = require("path");
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
var busboy = require('connect-busboy');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const mkdirp = require('mkdirp');

const admins = require('../models/admins');
const users = require('../models/users');
const complaints = require('../models/complaints');

router.get('/home', async (req, res) => {

    var { isAdmin = false } = req.cookies;
    if (isAdmin !== 'true') {
        res.redirect('/');
    }
    else {
        var adminId = req.cookies.adminId;
        try {
            var admin = await admins.findById(adminId).exec();

            var cssFiles = ['style.css.css', 'leftStage.css', 'centerStage.css', 'rightStage.css', 'homeAdmin.css'];
            // try {
            var complaintsList = await complaints.find({}).populate('authorId');
            res.render('homeAdmin.ejs', { admin, complaintsList, cssFiles });

        } catch (error) {
            console.log('error', error);
        }
    }
});


router.get('/profile', async (req, res) => {
    var { isAdmin = false } = req.cookies;
    if (isAdmin !== 'true') {
        res.redirect('/');

    }
    else {
        var adminId = req.cookies.adminId;
        try {
            var admin = await admins.findById(adminId).exec();

            var cssFiles = ['style.css.css', 'leftStage.css', 'centerStage.css', 'rightStage.css', 'profileAdmin.css'];
            try {
                var complaintsList = await complaints.find({}).populate('authorId');
                // let keys = [];
                // let lPrice = "";
                // let hPrice = "";
                res.render('profileAdmin.ejs', { admin, complaintsList, cssFiles });

            }
            catch (error) {
                console.log('error', error);
            }
        }
        catch (error) { console.log(error); }
    }
});
router.get('/complaint/:cid', async (req, res) => {
    var { isAdmin = false } = req.cookies;
    if (isAdmin !== 'true') {
        res.redirect('/');
    }
    else {
        var adminId = req.cookies.adminId;
        try {
            var admin = await admins.findById(adminId).exec();

            var cssFiles = ['style.css.css', 'leftStage.css', 'centerStage.css', 'rightStage.css', 'complaintAdmin.css'];
            var qw = req.params;
            try {
                var complaint = await complaints.findById(qw.cid).exec();
                console.log(complaint);
                res.render('complaintAdmin.ejs', { admin, complaint, cssFiles });
            }
            catch (error) {
                console.log('error', error);
            }
        }
        catch (error) { console.log(error); }
    }
});

router.post('/changeStatus/:cid', async (req, res) => {
    var { isAdmin = false } = req.cookies;

    if (isAdmin !== 'true') {
        res.redirect('/');
    }
    else {
        var qw = req.params;
        var adminId = req.cookies.adminId;
        try {
            var admin = await admins.findById(adminId).exec();
            var complaint = await complaints.findById(qw.cid).exec();

            complaint.status = req.body.status;
            


            try {
                    await complaint.save()
                    .then(complaint => {
                        console.log(`${complaint} updated`);

                        res.redirect(`/admin/complaint/`+ qw.cid);
                    })
                    .catch(err => {
                        console.log(err);
                    });;

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) { console.log(error); }
    }

});



router.post('/updateAdminProfile', async (req, res) => {
    var { isAdmin = false } = req.cookies;

    if (isAdmin !== 'true') {
        res.redirect('/');
    }
    else {
        var adminId = req.cookies.adminId;
        try {
            var admin = await admins.findById(adminId).exec();

            // console.log('after getting admin', typeof (req.file), typeof(req.files), req.files);
            if (req.files == null) {

                var cpname = "";
                var dpname = "";
            } else {
                var dp = req.files.displayPic;
                var cp = req.files.coverPic;
                var cpname = typeof (cp) !== 'undefined' ? cp.name : "";
                var dpname = typeof (dp) !== 'undefined' ? dp.name : "";

            }


            try {

                var oldcp = admin.coverPic;
                var olddp = admin.displayPic;
                admin.name = req.body.name;
                admin.email = req.body.email,
                    admin.phone = req.body.phone;
                admin.bio = req.body.bio;
                if (dpname != "") {
                    admin.displayPic = dpname;
                }
                if (cpname != "") {
                    admin.coverPic = cpname;
                }
                // console.log('dp cp', olddp, oldcp, dpname , cpname, 'admin to be saved', admin);

                await admin.save()
                    .then(admin => {
                        console.log(`${admin} updated`);

                        fs.mkdirSync(`public/admin_images/${admin._id}/coverPic`
                            , { recursive: true }

                        );

                        if (cpname != "") {

                            // if (imageFile != "") {
                            if (oldcp != "") {
                                fs.unlinkSync('public/admin_images/' + admin._id + '/coverPic/' + oldcp
                                    // , function (err) {
                                    //     if (err)
                                    //         console.log(err);
                                    // }
                                );
                            }
                            var path = 'public/admin_images/' + admin._id + '/coverPic/' + cp.name;
                            cp.mv(path, function (err) {
                                return console.log(err);
                            });
                            console.log('cp moved');
                        }

                        fs.mkdirSync(`public/admin_images/${admin._id}/displayPic`
                            , { recursive: true }
                            // , (err) => {
                            //     if (err) {
                            //         return console.error(err);
                            //     }
                            //     console.log('dp Directory created successfully!');
                            // }
                        );
                        console.log('dp Directory created successfully!');

                        if (dpname != "") {

                            if (olddp != "") {
                                fs.unlinkSync('public/admin_images/' + admin._id + '/displayPic/' + olddp
                                    // , function (err) {
                                    //     if (err)
                                    //         console.log(err);
                                    // }
                                );
                            }
                            var path = 'public/admin_images/' + admin._id + '/displayPic/' + dp.name;
                            dp.mv(path, function (err) {
                                return console.log(err);
                            });
                            console.log('dp moved');
                        }
                        console.log('going to redirect');
                        res.redirect(`/admin/profile`);
                    })
                    .catch(err => {
                        console.log(err);
                    });;

            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) { console.log(error); }
    }

});



router.get('/logout', (req, res) => {
    res.cookie('isAdmin', false);
    res.redirect('/');
});

module.exports = router;