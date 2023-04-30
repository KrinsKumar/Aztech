let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Not compoleted - need to correct the schemes and add more schemas

const userSchema = new Schema({
    "userName" : {
        "type": String,
        "unique": true
    },
    "password": String,
    "email": String,
    "discount": Number,
});

const productSchema = new Schema({
    "productName": {
        "type": String,
        "unique": true
    },
    "price": Number,
    "description": String,
    "inventory": Number,
    "image": String,
    "category": String,
    "rating": Number,
    "reviews": Array
});

// I dont think we need the products here in the categorySchema, since all products have a category field to filter products from a specific category
const categorySchema = new Schema({
    "categoryName": {
        "type": String,
        "unique": true
    },
    // "products": Array
});

const cartSchema = new Schema({
    "userName": String,
    "products": Array
});


