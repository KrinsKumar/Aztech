//queries all the product and categories from the database
// and saves it in a variable
const dotenv = require('dotenv').config();
const database = require('./database')
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

let Product;
let Category;
let Cart;

exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(process.env.MONGO_CONNECTION_STRING);

        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Product = db.model("product", database.productSchema);
            Category = db.model("categorie", database.categorySchema);
            Cart = db.model("cart", database.cartSchema);
            resolve();
        });
    });
};

exports.getAllProducts = function(){
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

exports.getAllCategories = function(){
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

exports.getAllProductsByCategory = function(categoryName){
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

exports.getProductById = function(val){
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

exports.getCategoryById = function(val){
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

exports.getCartById = function(val){
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

exports.getCartItems = function(val)
{
    return new Promise((resolve, reject) => {
        exports.getCartById(val)
        .then((cart)=>{
            resolve(cart.products)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

exports.getAllCarts = function(){
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