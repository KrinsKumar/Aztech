const {cartModel, userModel, productModel} = require('../model/database.js')
let mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const express = require("express");
const app = express();
const router = express.Router();

//middleware

app.use(function(req,res,next) {
    res.locals.session = req.session;
    next();
})

function ensureLogin(req, res, next) { 
    if (!req.session.user) {
      res.redirect("/login");
    } else {
    if (!req.session.user.userName) {
            res.redirect("/login");
        } else {
        next();
        }
    }
}

function ensureCart(req, res, next) { 
    if (!req.session.cart) {
      res.redirect("/cart");
    } else {
        next();
    }
}

function checkAdmin(req, res, next) {
    if (req.session.user.userName === "admin") {
        next();
    } else {
        res.redirect("/noaccess");
    }
}

function ensureAccess(req, res, next) {
    // isAccessable takes 2 argument first one is cartID. // TODO
  if(isAccessable(req.session.email)) {
      next();
  } else {
      res.render('home', {
          layout: 'noAccess'
      })
  }
}

//functions
const initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(process.env.MONGO_CONNECTION_STRING);

        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            carts = db.model("cart", cartModel);
            resolve();
        });
    });
};

//returns the cart data
const getCart = function(cartIdPara) {
    return new Promise((resolve, reject) => {
        cartModel.find({cartID: cartIdPara}).lean()
        .exec()
        .then((data)=>{
            resolve(data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

//checks if the cart can be ordered
const isCartApproved = function(cartIdPara) {
    return new Promise((resolve, reject) => {
        carts.find({
            "cartID": cartIdPara
        })
        .exec()
        .then((data)=>{
            forEach(data.collaborators, (collaborator)=>{
                if(collaborator.isModerator && !collaborator.approved){
                    resolve(false);
                }
            })
            resolve(true);
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

//checks if the access is granted
const isAccessable = function(cartIdPara, emailPara) {
    return new Promise((resolve, reject) => {
        carts.find({
            "cartID": cartIdPara
        })
        .exec()
        .then((data)=>{
            forEach(data.collaborators, (collaborator) => {
                if(collaborator.email == emailPara){
                    resolve(true);
                }
            });
            resolve(false);
        })
        .catch((err)=>{
            reject(err)
        })
    })
};

//add collaborator to the cart
const addCollaborator = function(cartIdPara, emailPara) {
    return new Promise((resolve, reject) => {
        carts.find({
            "cartID": cartIdPara
        })
        .exec()
        .then((data)=>{
            data.collaborators.push({
                "email": emailPara,
                "isModerator": false,
                "approved": false
            });
            data.save();
            resolve(true);
        })
        .catch((err)=>{
            reject(err)
        })
    })
};

//make moderator
const makeModerator = function(cartIdPara, emailPara) {
    return new Promise((resolve, reject) => {
        carts.find({
            "cartID": cartIdPara
        })
        .exec()
        .then((data)=>{
            forEach(data.collaborators, (collaborator) => {
                if(collaborator.email == emailPara){
                    collaborator.isModerator = true;
                    data.save();
                    resolve(true);
                }
            });
            resolve(false);
        })
        .catch((err)=>{
            reject(err)
        })
    })
};

//remove moderator
const removeModerator = function(cartIdPara, emailPara) {
    return new Promise((resolve, reject) => {
        carts.find({
            "cartID": cartIdPara
        })
        .exec()
        .then((data)=>{
            forEach(data.collaborators, (collaborator) => {
                if(collaborator.email == emailPara){
                    collaborator.isModerator = false;
                    data.save();
                    resolve(true);
                }
            });
            resolve(false);
        })
        .catch((err)=>{
            reject(err)
        })
    })
};

//remove collaborator
const removeCollaborator = function(cartIdPara, emailPara) {
    return new Promise((resolve, reject) => {
        carts.find({
            "cartID": cartIdPara
        })
        .exec()
        .then((data)=>{
            forEach(data.collaborators, (collaborator) => {
                if(collaborator.email == emailPara){
                    data.collaborators.remove(collaborator);
                    data.save();
                    resolve(true);
                }
            });
            resolve(false);
        })
        .catch((err)=>{
            reject(err)
        })
    })
};

//update the collabrators approved status
const updateCollaborator = function(cartIdPara, emailPara, approvedPara) {
    return new Promise((resolve, reject) => {
        carts.find({
            "cartID": cartIdPara
        })
        .exec()
        .then((data)=>{
            forEach(data.collaborators, (collaborator) => {
                if(collaborator.email == emailPara){
                    collaborator.approved = approvedPara;
                    data.save();
                    resolve(true);
                }
            });
            resolve(false);
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

//add product to the cart
const addproduct = function(cartIdPara, productPara) {
    return new Promise((resolve, reject) => {
        if (productPara.name == "" || productPara.name == null || productPara.name == undefined
            || productPara.quantity == 0 || productPara.price == 0) {
            rej("Invalid product");
        } else {
            carts.find({
                "cartID": cartIdPara
            })
            .exec()
            .then((data) => {
                data.products.push(productPara);
                data.save();
                resolve(true);
            })
            .catch((err)=>{
                reject(err)
            })
        }
    })
};

//remove product from the cart
const removeproduct = function(cartIdPara, productNamePara) {
    return new Promise((resolve, reject) => {
        if (productNamePara == "" || productNamePara == null || productNamePara == undefined) {
            rej("Invalid product Name");
        } else {
            carts.find({
                "cartID": cartIdPara
            })
            .exec()
            .then((data)=>{
                forEach(data.products, (product) => {
                    if(product.name == productNamePara){
                        data.products.remove(product);
                        data.save();
                        resolve(true);
                    }
                });
                resolve(false);
            })
            .catch((err)=>{
                reject(err)
            })
        }
    })
}

const loadProduct = function(product) {
    return new Promise((resolve, reject) => {
        productModel.findOne({sku: product.sku}).lean()
        .exec()
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

const loadAllCarts = function(userNamePara) {
    return new Promise((resolve, reject) => {
        userModel.findOne({userName: userNamePara}).lean()
        .exec()
        .then((userData) => {
            let promises = userData.carts.map(async (cart) => {
                let thisCart = await getCart(cart.cartID);
                return thisCart[0];
            })

            Promise.all(promises).
            then((allCarts) => {
                resolve(allCarts);
            })
        })
        .catch((err) => {
            reject(err);
        });
        
    })
}

function loadCartPage(req, res, cartt, cartErrorr = null) {
    cartModel.findOne({cartID: cartt}).lean()
    .exec()
    .then(data=>{
        if (data == null) {
            res.render("cart", {
                error: "This cart does not exist"
            })
        } else {
            loadAllCarts(req.session.user.userName).then((cartData) => {
                req.session.cart = {
                    cartID: data.cartID
                }
                if (cartErrorr == null) {
                    res.render("cart", {
                        carts: cartData,
                        thisCart: data
                    })
                } else {
                    res.render("cart", {
                        carts: cartData,
                        thisCart: data,
                        cartError: cartErrorr
                    })
                }
            })
        }
    })
    .catch(err=>{
        res.render("cart", {
            error: err
        })
    })
}

//todo no carts, carts seggraigation for owned and added
// admin page
// 
//Renders all the carts that the user owns or have access to

router.get("/", ensureLogin , (req, res) => {
    loadAllCarts(req.session.user.userName).then((cartData) => {
        if (cartData.length == 0) {
            res.render("allCarts")
        } else {
            res.render("allCarts", {
                carts: cartData
            })
        }
    }).catch((err) => {console.log(err)})
});

router.post("/", ensureLogin, (req, res) => {
    let cartFound = false;
    let allCarts = [];
    userModel.find({userName: req.session.user.userName}).lean().exec()
    .then((data)=>{
        data[0].carts.forEach((cart) => {
            if(cart.cartID == req.session.user.userName + req.body.cart) {
                cartFound = true;
            }
        })
        allCarts = data[0].carts;
    })

        let cart = new cartModel({
            cartID: req.session.user.userName + req.body.cart,
            userName: req.session.user.userName,
            cartName: req.body.cart,
            totalPrice: 0
        });

        cart.save()
        .then((data)=>{
            userModel.updateOne({userName: req.session.user.userName}, 
                {$push: {carts: {
                    cartID: req.session.user.userName + req.body.cart,
                    owner: true
                }}}
            ).then((data)=>{}).catch((err)=>{});
            
            loadAllCarts(req.session.user.userName).then((cartData) => {
                if (cartFound) {res.render("allCarts", {
                    carts: cartData,
                    error: "A cart with that name already exists"
                });

                } else {
                    res.render("allCarts", {
                        carts: cartData,
                    });
                }
            });
        })
        .catch((err)=>{
            res.render("allCarts", {
                error: err
            });
        })
});

router.get("/:id", ensureLogin, (req, res)=>{
    req.session.cart = {
        cartID: req.params.id
    }
    cartModel.findOne({cartID: req.params.id}).lean()
    .exec()
    .then(data=>{
        if (data == null) {
            res.render("cart", {
                error: "This cart does not exist"
            })
        } else {
            loadAllCarts(req.session.user.userName).then((cartData) => {
                req.session.cart = {
                    cartID: data.cartID
                }
                let promises = data.products.map(async (product) => {
                    let thisProduct = await loadProduct(product);
                    thisProduct.quantity = product.quantity;
                    return thisProduct;
                })
                Promise.all(promises)
                .then((allProducts) => {

                    userModel.findOne({userName: data.userName}).lean().exec()
                    .then((userData) => {

                        if (userData.discounted) {
                            if(data.userName != req.session.user.userName) {
                                res.render("cart", {
                                    carts: cartData,
                                    thisCart: data,
                                    products: allProducts,
                                    discounted: userData.discounted
                                })
                            }
                            else {
                                res.render("cart", {
                                    carts: cartData,
                                    thisCart: data,
                                    leader: true,
                                    products: allProducts,
                                    discounted: userData.discounted
                                })
                            }
                        } else {
                            if(data.userName != req.session.user.userName) {
                                res.render("cart", {
                                    carts: cartData,
                                    thisCart: data,
                                    products: allProducts
                                })
                            }
                            else {
                                res.render("cart", {
                                    carts: cartData,
                                    thisCart: data,
                                    leader: true,
                                    products: allProducts
                                })
                            }
                        }
                    })
                })
            })
        }
    })
    .catch(err=>{
        res.render("cart", {
            error: err
        })
    })
})

router.post('/addmod', ensureLogin, ensureCart, (req, res) => {
    if(req.body.email == req.session.user.email) {
        loadCartPage(req, res, req.session.cart.cartID, "You cannot add yourself as a collaborator");
    } else {
        userModel.updateOne({email: req.body.email},
            {$push: {carts: {
                cartID: req.session.cart.cartID,
                owner: false,
            }}  
        }).then((data)=>{
            if (data.modifiedCount == 0) {
                loadCartPage(req, res, req.session.cart.cartID, "No user with that email exists");
            } else {
                let modd;
                if (req.body.mod == "on") modd = true; 
                else  modd = false;
                
                cartModel.updateOne({cartID: req.session.cart.cartID},{
                    $push: {collaborators: {
                        email: req.body.email,
                        approved: false,
                        isModerator: modd
                    }}
                }).then((dataa)=>{
                    res.redirect("/cart/" + req.session.cart.cartID);
                })

            }
        })
    }

});


module.exports = router;