const {cartModel, userModel} = require('../model/database.js')
let mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const express = require("express");
const router = express.Router();
const middle = require("./middleware.js");


let carts;

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
        carts.find({cartID: cartIdPara})
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

//load all users cart
const loadAllCarts = function(userNamePara) {
    return new Promise((resolve, reject) => {
        let allCarts = [];
        userModel.findOne({userName: userNamePara})
        .exec()
        .then((userData) => {
            userData.carts.forEach((cart) => {
                carts.findOne({cartID: cart.cartID})
                .exec()
                .then((cartData) => {
                    cartData.owner = cart.owner;
                    allCarts.push(cartData);
                })
                .catch((err) => {
                    rej(err);
                });
            });
            resolve(allCarts);
        })
        .catch((err) => {
            rej(err);
        });
        
    })
}

//todo no carts, carts seggraigation for ownder and added
//Renders all the carts that the user owns or have access to
router.get("/", generalController.ensureLogin, (req, res) => {
    loadAllCarts(req.session.user.userName).then((cartData) => {
        res.render("home", {
            carts: cartData
        })

    })
});