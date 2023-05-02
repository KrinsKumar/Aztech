let mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const {userModel, productModel, categoryModel, cartModel} = require('../model/database.js')

let registerUser = function (data) {
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
    res.render("login", {
        link: "/register",
        linkText: "Register"
    })
})

router.post("/login", (req, res)=>{
    // logging in user
    const { username, password } = req.body;
    userModel.findOne({
        userName: username
    })
        .then((user) => {
            if (user) {
                // user exist with that email
                bcryptjs.compare(password, user.password)
                    .then(matched => {
                        if (matched) {
                            req.session.user = {
                                userName: user.userName,
                                email: user.email
                            };
                            res.redirect("/");
                        }
                        else {
                            res.render("login", {
                                error: "Incorrect Password",
                                link: "/register",
                                linkText: "Register"
                            })
                        }
                    })
            }
            else {
                res.render("login", {
                    error: "Incorrect Username",
                    link: "/register",
                    linkText: "Register"
                })
            }
        })
})

router.get("/register", (req, res)=>{
    res.render("register", {
        link: "/login",
        linkText: "Login"
    });
})

router.post("/register", (req, res)=>{
    console.log(req.body);
    const { userName, email, password} = req.body;
    let user = new userModel({userName, email, password});

    user.save()
    .then(() => {
        console.log("user created successfully");
        res.redirect("/login");
    })
    .catch(err => {

        if (err.code == 11000) {
            res.render("register", {
                error: `Username or Email already taken!`,
                link: "/login",
                linkText: "Login"
            });
        } else {
            res.render("register", {
                error: `Unkown Error`,
                link: "/login",
                linkText: "Login"
            });
        }
    });
})

module.exports = router;