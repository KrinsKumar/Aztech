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
    "discount": Number
});

const productSchema = new Schema({
    "productName": {
        "type": String,
        "unique": true
    },
    "price": Number,
    "description": [{ 
        "heading": String, 
        "text": String 
    }],
    "inventory": Number,
    "image": String,
    "category": String,
    "agnecy": [String], // array of addresses of the photos of the agencies 
    "hasChild": Boolean, // true if this is a sub category
    "discountable": Boolean,  // true if this product can be discounted
    "notification-list": [String]
});
productSchema.add({
    "subProducts" : [productSchema] // array of sub products if this is a sub category
})

const categorySchema = new Schema({
    "categoryName": {
        "type": String,
        "unique": true
    },
    "image": String
});

const cartSchema = new Schema({
    "userName": String,
    "products": [{
        "productName": String, 
        "quantity": Number, 
        "price": Number
    }],
    "totalPrice": Number,
    "collaborators": [{
        "email": String,
        "isModerator": Boolean,
        "approved": Boolean
    }]
});

//to export
exports.userSchema = userSchema;
exports.productSchema = productSchema;
exports.categorySchema = categorySchema;
exports.cartSchema = cartSchema;

