let mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const {userModel, productModel, categoryModel, cartModel} = require('../model/database.js')
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);


//functions
function generateRandomNumber() {
    return Math.floor(Math.random() * 900000) + 100000;
}


//routes
router.get("/login", (req, res) => {
    res.render("login", {
        link: "/register",
        linkText: "Register"
    })
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    userModel.findOne({
        userName: username
    })
        .then((user) => {
            if (user) {
                bcryptjs.compare(password, user.password)
                
                    .then(matched => {
                        if (matched) {
                            let newNumber = generateRandomNumber();

                            const msg = {  //email body
                                to: user.email,
                                from: "eazeurban@gmail.com",
                                subject: "2 Factor Authetication for UrbanEaze login",
                                html:
                                    `Your verification code is ${newNumber}.`
                            };

                            sgMail.send(msg)  //send the email
                                .then(() => {
                                    //save the code into the database
                                    userModel.updateOne({ userName: username },
                                        {$set: { verificationCode: newNumber }}
                                    );
                                    req.session.user = {
                                        email: user.email,
                                    };
                                    res.redirect("/2factor");
                                })
                                .catch(err => {
                                    res.render("login", {
                                        error: "Faled to send the verification email",
                                        link: "/register",
                                        linkText: "Register"
                                    })
                                }
                            );
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

router.get("/2factor", (req, res) => {
    res.render("2factor", {
        link: "/register",
        linkText: "Register"
    });
})

router.post("/2factor", (req, res) => {
    let code = req.body.code;
    code = parseInt(code);

    const userEmail = req.session.user.email;
    userModel.findOne({ email: userEmail })
    .then((user) => {
        if (user) {
            if (code === user.verificationCode) {
                req.session.user = {
                    userName: user.userName,
                    email: user.email
                };
                res.redirect("/");
            }
            else {
                res.render("2factor", {
                    error: "Code didnt match",
                    link: "/register",
                    linkText: "Register"
                });
            }
        }
    })
})

router.get("/register", (req, res) => {
    res.render("register", {
        link: "/login",
        linkText: "Login"
    });
})

router.post("/register", (req, res) => {
    const { userName, password } = req.body;
    let user = new userModel({ userName, email, password });

    user.save()
        .then(() => {

            let newNumber = generateRandomNumber();
            const msg = {
                to: req.body.email,
                from: "eazeurban@gmail.com",
                subject: "Email Verification for Urban Eaze",
                html:
                    `Your verification code is ${newNumber}.`
            };

            sgMail.send(msg)  //send the email
            .then(() => {
                userModel.updateOne({ userName: username },
                    {$set: { verificationCode: newNumber }}
                );
                req.session.user = {
                    email: req.body.email,
                };
                res.redirect("/verify");
            })
            .catch(err => {
                res.render("login", {
                    error: "Faled to send the verification email",
                    link: "/register",
                    linkText: "Register"
                })
            });
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


router.get("/verify", (req, res) => {
    res.render("verification", {
        layout: "main",
    });
})
router.post("/verify", (req, res) => {
    let code = req.body.code;
    code = parseInt(code);

    const userEmail = req.session.user.email;
    userModel.findOne({ email: userEmail })
    .then((user) => {
        if (user) {
            if (code === user.verificationCode) {
                req.session.user = {
                    userName: user.userName,
                    email: user.email
                };
                userModel.updateOne({ userName: email }, { verified: true })
                .then(data => { res.redirect("/") })
                .catch(err => { res.redirect("/verify") })
                res.redirect("/");
            }
            else {
                res.render("verify", {
                    error: "Code didnt match",
                    link: "/register",
                    linkText: "Register"
                });
            }
        }
    })
})



module.exports = router;