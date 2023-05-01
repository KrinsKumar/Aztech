//queries all the product and categories from the database
// and saves it in a variable
let mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const {userModel, productModel, categoryModel, cartModel} = require('../model/database.js')
const express = require("express");
const router = express.Router();
/*
Following function:
1. Queries all the products and categories from the database and save it in a variable
2. get all products
3. get all categories
4. get all products in a category
5. get a product by id
6. get a category by id
7. get all products in a cart
8. get a cart by id
9. get all carts
10. get all carts by user
*/

let Productdb;
let Categorydb;
let Cartdb;

const initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(process.env.MONGO_CONNECTION_STRING);

        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Productdb = db.model("product", database.productSchema);
            Categorydb = db.model("categorie", database.categorySchema);
            Cartdb = db.model("cart", database.cartSchema);
            resolve();
        });
    });
};

const getAllProducts = function(){
    return new Promise((resolve, reject) => {
        Product.find({})
        .exec()
        .then((data)=>{
            resolve(data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

const getAllCategories = function(){
    return new Promise((resolve, reject) => {
        Category.find({})
        .exec()
        .then((data)=>{
            resolve(data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

const getAllProductsByCategory = function(categoryName){
    return new Promise((resolve, reject) => {
        Product.find({category:categoryName})
        .exec()
        .then((data)=>{
            resolve(data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

const getProductById = function(val){
    return new Promise((resolve, reject) => {
        Product.findOne({_id : val})
        .exec()
        .then((product)=>{
            resolve(product)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

const getCategoryById = function(val){
    return new Promise((resolve, reject) => {
        Category.findOne({_id : val})
        .exec()
        .then((category)=>{
            resolve(category)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

const getCartById = function(val){
    return new Promise((resolve, reject) => {
        Cart.findOne({_id : val})
        .exec()
        .then((cart)=>{
            resolve(cart)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

const getCartItems = function(val)
{
    return new Promise((resolve, reject) => {
        getCartById(val)
        .then((cart)=>{
            resolve(cart.products)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

const getAllCarts = function(){
    return new Promise((resolve, reject) => {
        Cart.find({})
        .exec()
        .then((carts)=>{
            resolve(carts)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

router.get("/", (req, res)=>{
    // productData.getAllProducts()
    // .then((data) => {
    //     if (data.length > 0) {
    //         res.render("product", { products: data })
    //     }
    //     else {
    //         res.render("product", { message: "no results" })
    //     }
    // }).catch((err) => {
    //     res.render("product", { message: "no results" })
    // })
    res.render("product", { layout: "main" })
})
module.exports = router;
