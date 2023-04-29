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
    "quantity": Number,
    "image": String,
    "category": String,
    "discount": Number,
    "rating": Number,
    "reviews": Array
});
