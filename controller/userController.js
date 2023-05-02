let mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const {userModel, productModel, categoryModel, cartModel} = require('../model/database.js')
const express = require("express");
const router = express.Router()
const bcryptjs = require("bcryptjs");
// exports.initialize = function () {
//     return new Promise(function (resolve, reject) {
//         let db = mongoose.createConnection(process.env.MONGO_CONNECTION_STRING);

//         db.on('error', (err) => {
//             reject(err); // reject the promise with the provided error
//         });
//         db.once('open', () => {
//             user = db.model("user", database.userSchema);
//             resolve();
//         });
//     });
// };

exports.registerUser = function (data) {
    return new Promise((resolve, reject) => {
        //if the password do not match or the data is empty
        if ((data.password != data.password2) || !data) {
            reject("Passwords do not match");
        }

        let newUser = new Userdb(data);
        newUser.save((err) => {
            if (err) {
                reject(err);
            } else {
                resolve(`new user: ${newUser.userName} successfully registered`);
            }
        });
    });
};
router.get("/login", (req, res)=>{
    res.render("login", {layout: "main"});
})

router.post("/login", (req, res)=>{
    // logging in user
    const { email, password} = req.body;
    userModel.findOne({
        Email: email
    })
        .then((user) => {
            if (user) {
                // user exist with that email
                bcryptjs.compare(password, user.Password)
                    .then(matched => {
                        if (matched) {
                            // password matched
                            console.log("Password Matched")
                            res.redirect("/");
                        }
                        else {
                            console.log("Password didnt match");
                            res.redirect("/login");
                        }
                    })
            }
            else {
                console.log("No user found");
                res.redirect("/login");
            }
        })
})

router.get("/sign-up", (req, res)=>{
    res.render("register", {layout: "main"});
})

router.post("/sign-up", (req, res)=>{
    console.log(req.body);
    const { userName, Email, Password} = req.body;
    let user = new userModel({userName, Email, Password});
    user.save()
    .then(() => {
        console.log("user created successfully");
        res.redirect("/");
    })
    .catch(err => {
        console.log("Couldn't create the user " + err);
        res.redirect("/sign-up");
    });
})
router.get("/", (req, res)=>{
    res.render("home", {layout: "main"})
})
module.exports = router;