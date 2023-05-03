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


// const initialize = function () {
//     return new Promise(function (resolve, reject) {
//         let db = mongoose.createConnection(process.env.MONGO_CONNECTION_STRING);

//         db.on('error', (err) => {
//             reject(err); // reject the promise with the provided error
//         });
//         db.once('open', () => {
//             Productdb = db.model("product", database.productSchema);
//             Categorydb = db.model("categorie", database.categorySchema);
//             Cartdb = db.model("cart", database.cartSchema);
//             resolve();
//         });
//     });
// };

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

const getCategoryById = function(val){
    return new Promise((resolve, reject) => {
        categoryModel.findOne({_id : val})
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


router.get('/', (req, res) => {
    getAllProducts()
      .then((products) => {
        res.render('products', { products });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error retrieving products');
      });
  });
  
router.get('/categories', (req, res) => {
getAllCategories()
    .then((categories) => {
    res.render('categories', { categories });
    })
    .catch((err) => {
    console.error(err);
    res.status(500).send('Error retrieving categories');
    });
});
  
  // GET all products in a category
router.get('/categories/:id/products', (req, res) => {
const categoryId = req.params.id;

getAllProductsByCategory(categoryId)
    .then((products) => {
    res.render('products', { products });
    })
    .catch((err) => {
    console.error(err);
    res.status(500).send('Error retrieving products in category');
    });
});
  
// GET a product by ID
router.get('/:id', (req, res) => {
const SKU = req.params.id;

    getProductBySku(SKU)
    .then((product) => {
    res.render('product', { product });
    })
    .catch((err) => {
    console.error(err);
    res.status(500).send('Error retrieving product');
    });
});
  
// GET a category by ID
router.get('/categories/:id', (req, res) => {
const categoryId = req.params.id;

getCategoryById(categoryId)
    .then((category) => {
    res.render('category', { category });
    })
    .catch((err) => {
    console.error(err);
    res.status(500).send('Error retrieving category');
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
    getProductBySku(SKU)
    .then((data)=>{
        res.render("product", { layout: "main", data })})
    .catch(err=>{console.log(err)});
})

module.exports = router;
