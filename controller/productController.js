//queries all the product and categories from the database
// and saves it in a variable
let mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const {userModel, productModel, categoryModel, cartModel} = require('../model/database.js')
const express = require("express");
const router = express.Router();

const getAllProducts = function(){
    return new Promise((resolve, reject) => {
        productModel.find({})
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
        categoryModel.find({})
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
        productModel.find({category:categoryName})
        .exec()
        .then((data)=>{
            resolve(data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

const getProductBySku = function(val){
    return new Promise((resolve, reject) => {
        productModel.findOne({sku : val})
        .exec()
        .then((product)=>{
            console.log(product);
            resolve(product)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}


router.get('/', (req, res) => {
    getAllProducts()
      .then((products) => {
        res.render('product', { layout: "main", data:products });
    })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error retrieving products');
      });
  });
  
router.get('/categories', (req, res) => {
getAllCategories()
    .then((categories) => {
        res.render('categories', { layout: "main", data:categories });
    })
    .catch((err) => {
    console.error(err);
    res.status(500).send('Error retrieving categories');
    });
});

router.get('/category/:name', (req, res) => {
    const categoryName = req.params.name;
  
    getAllProductsByCategory(categoryName)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error retrieving products by category');
      });
  });

router.get("/:sku", (req, res)=>{
    const SKU = req.params.sku;
    console.log(SKU); 
    getProductBySku(SKU)
    .then((data)=>{
        res.render("product", { layout: "main", data })})
    .catch(err=>{console.log(err)});
})

module.exports = router;
