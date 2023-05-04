//queries all the product and categories from the database
// and saves it in a variable
let mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const { userModel, productModel, categoryModel, cartModel } = require('../model/database.js')
const express = require("express");
const router = express.Router();

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

const getAllCategories = function () {
    return new Promise((resolve, reject) => {
        categoryModel.find({})
            .exec()
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const getAllProductsByCategory = function (val) {
    return new Promise((resolve, reject) => {
        productModel.find({ category: val })
            .exec()
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const getProductBySku = function (val) {
    return new Promise((resolve, reject) => {
        productModel.findOne({ sku: val })
            .exec()
            .then((product) => {
                resolve(product)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

router.get('/', (req, res) => {
    getAllCategories()
      .then((categories) => {
        const promises = categories.map(async (category) => {
          const products = await getAllProductsByCategory(category.id);
            category.products = products;
            return category;
        });
  
        Promise.all(promises)
          .then((categoryProducts) => {
            categoryProducts.forEach((cat)=>{
                console.log(cat.products);
            })
            res.render('product', { layout: "main", catData: categoryProducts });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Error retrieving products');
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error retrieving categories');
      });
  });

router.get("/:sku", (req, res) => {
    const SKU = req.params.sku;
    let related, bundle;
    getProductBySku(SKU)
        .then((data) => {
            console.log("here : " + data);
            getAllProductsByCategory(data.category)
                .then((rel) => {
                    related = rel;
                    res.render("product", {
                        layout: "main",
                        product: data,
                        relatedProducts: related,
                        bundleProducts: bundle
                    })
                })
        })
        .catch(err => { console.log(err) });
})

module.exports = router;
