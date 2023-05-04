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

function getAllUsers()
{
    return new Promise((resolve, reject) => {
        userModel.find({})
        .exec()
        .then((users=>resolve(users)))
        .catch((err)=>console.log(err))
    })
}

const getAllProducts = function () {
    return new Promise((resolve, reject) => {
        productModel.find({})
            .exec()
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
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
                                    ).then(data => { console.log() })
                                    .catch(err => { console.log() });
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
        email: req.session.user.email,
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
                if(req.session.user.userName == "Admin")
                {
                    res.render("/adminMain", {layout: "admin"})
                }
                else
                {
                    res.redirect("/");
                }
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
    const { userName, email, password } = req.body;
    let user = new userModel({ userName, email, password });

    user.save()
        .then(() => {

            let newNumber = generateRandomNumber();
            const msg = {
                to: email,
                from: "eazeurban@gmail.com",
                subject: "Email Verification for Urban Eaze",
                html:
                    `Your verification code is ${newNumber}.`
            };

            sgMail.send(msg)  //send the email
            .then(() => {
                userModel.updateOne({ "userName": req.body.userName },
                    {"verificationCode": newNumber }
                ).then(data => { console.log() })
                .catch(err => { console.log() });
                req.session.user = {
                    "email": email,
                };
                res.redirect("/verify");
            })
            .catch(err => {
                res.render("register", {
                    error: `Faled to send the verification email ${err}`,
                    link: "/login",
                    linkText: "login"
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
        email: req.session.user.email,
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
                userModel.updateOne({ email: userEmail }, { verified: true })
                .then(data => { res.redirect("/") })
                .catch(err => { res.redirect("/verify") })
            }
            else {
                res.render("verification", {
                    error: "Code didnt match",
                    link: "/register",
                    linkText: "Register"
                });
            }
        }
    })
})

router.get('/admin/users', (req, res)=>{
const username = req.session.user.userName;
if(username == "Admin")
{
    getAllUsers()
    .then((data)=>{
        const displayUsers = data.map(user => {
            return { name: user.userName, email: user.email, discount: user.discount, cartList: user.carts};
          });
          console.log(displayUsers);
                res.render("users", {
            layout: 'admin',
            users: displayUsers
        })
    })
}
else{
    res.redirect("/login");
}
})

router.get('/admin/products', (req, res)=>{
    const username = req.session.user.userName;
    if(username == "Admin")
    {
        getAllProducts()
        .then((data)=>{
            res.render("product", {
                layout: 'admin',
                products: data
            })
        })
    }
    else{
        res.redirect("/login");
    }
    })

router.get("/logout", (req, res)=>{
    req.session.destroy();
    // MongoStore.destroy(),
    res.redirect("login");
})

module.exports = router;