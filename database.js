let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Not compoleted - need to correct the schemes and add more schemas

export const userSchema = new Schema({
    "userName" : {
        "type": String,
        "unique": true
    },
    "password": String,
    "email": String,
    "discount": Number,
});

export const productSchema = new Schema({
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
    "agnecy": [string] // array of addresses of the photoes of the agencies 
});

export const categorySchema = new Schema({
    "categoryName": {
        "type": String,
        "unique": true
    },
    "image": String
});

export const cartSchema = new Schema({
    "userName": String,
    "products": [{
        "productName": String, 
        "quantity": Number, 
        "price": Number
    }],
    "totalPrice": Number
});

//---------------------------------------------------------------------
//Open Connection


