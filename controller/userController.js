let mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { userModel, productModel, categoryModel, cartModel } = require('../model/database.js')


function generateRandomNumber() {
    return Math.floor(Math.random() * 900000) + 100000;
}
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

router.get("/login", (req, res) => {
    res.render("login", {
        link: "/register",
        linkText: "Register"
    })
})
let factorCode;
router.post("/login", (req, res) => {
    // logging in user
    const { username, password } = req.body;
    console.log(req.body);
    userModel.findOne({
        userName: username
    })
        .then((user) => {
            if (user) {
                console.log(user)
                // user exist with that email
                bcryptjs.compare(password, user.password)
                
                    .then(matched => {
                        if (matched) {
                            req.session.user = {
                                userName: user.userName,
                                email: user.email
                            };
                            factorCode = generateRandomNumber();
                            const sgMail = require("@sendgrid/mail");
                            sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

                            const msg = {
                                to: email,
                                from: "eazeurban@gmail.com",
                                subject: "2 Factor Authetication for Urban Eaze login",
                                html:
                                    `Your verification code is ${verificationCode}.`
                            };

                            sgMail.send(msg)
                                .then(() => {
                                    res.redirect("/2factor");
                                })
                                .catch(err => {
                                    console.log(err);

                                    res.redirect("/login");
                                });
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
let verificationCode;
router.get("/register", (req, res) => {
    res.render("register", {
        link: "/login",
        linkText: "Login"
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
    if (code === verificationCode) {
        const email = req.session.user.email;
        userModel.updateOne({ userName: email }, { verified: true })
            .then(data => { res.redirect("/") })
            .catch(err => { res.redirect("/verify") })
    }
    else {
        res.render("verification", {
            layout: "main",
            msg: "Code didnt match"
        });
    }
})
router.get("/2factor", (req, res) => {
    res.render("2factor", {
        layout: "main",
    });
})
router.post("/2factor", (req, res) => {
    let code = req.body.code;
    code = parseInt(code);
    if (code === factorCode) {
        res.redirect("/");
    }
    else {
        res.render("2factor", {
            layout: "main",
            msg: "Code didnt match"
        });
    }
})



router.post("/register", (req, res) => {
    console.log(req.body);
    const { userName, email, password } = req.body;
    let user = new userModel({ userName, email, password });

    user.save()
        .then(() => {
            console.log("user created successfully");
            req.session.user = {
                userName: userName,
                email: email
            };
            // Continue and submit contact us form.
            verificationCode = generateRandomNumber();
            const sgMail = require("@sendgrid/mail");
            sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

            const msg = {
                to: email,
                from: "eazeurban@gmail.com",
                subject: "Email Verification for Urban Eaze",
                html:
                    `Your verification code is ${verificationCode}.`
            };

            sgMail.send(msg)
                .then(() => {
                    // res.redirect('/welcome');
                    user.save()
                        .then(() => {

                            res.redirect("/verify");
                        })
                        .catch(err => {
                            console.log("Couldn't create the user " + err);
                            res.redirect("/register");
                        });
                })
                .catch(err => {
                    console.log(err);

                    res.redirect("/register");
                });
            //res.redirect("/verify");
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
router.get("/logout", (req, res)=>{
    req.session.destroy();
    // MongoStore.destroy(),
    res.redirect("login");
})
module.exports = router;