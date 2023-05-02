const {cartModel} = require('../model/database.js')
let mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const express = require("express");
const router = express.Router();

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

const isCartApproved = function(cartIdPara) {
    return new Promise((resolve, reject) => {
        carts.find({
            cartID: cartIdPara,
            // collaborators.approved: true && collaborators.isModerator: true
            
        },)
        .exec()
        .then((data)=>{
            resolve(data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}