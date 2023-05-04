let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');
const { boolean } = require('webidl-conversions');
//Not compoleted - need to correct the schemes and add more schemas

const userSchema = new Schema({
    "userName" : {
        "type": String,
        "unique": true
    },
    "password": String,
    "email": {
        "type": String,
        "unique": true
    },
    "discount": Number,
    "verified": {
        "type": Boolean,
        "default": false
    },
    "carts": [{
        "cartID": Number,
        "owner": Boolean  // true if this user owns the cart
    }],
    "verificationCode": Number
});

const productSchema = new Schema({
    "sku": {
        "type": Number,
        "unique": true
    },
    "productName": {
        "type": String,
        "unique": true
    },
    "price": Number,
    "description" : String,
    "info": [{ 
        "heading": String, 
        "text": String 
    }],
    "inventory": Number,
    "image": [String],
    "notification-list": [String],
    "category": Number,
    "velocity": String,
    "specification": String,
    "manual": String
});


const categorySchema = new Schema({
    "id": {
        "type": Number,
        "unique": true
    },
    "categoryName": {
        "type": String,
        "unique": true
    },
    "image": String,
});

const cartSchema = new Schema({
    "cartName": String,
    "cartID": {
        "type": String,
        "unique": true
    },
    "userName": String,
    "products": [{
        "sku": Number, 
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

userSchema.pre("save", function (next) {
    let user = this;

    // Generate a unique SALT.
    bcryptjs.genSalt()
        .then(salt => {
            // Hash the password using the generated SALT.
            bcryptjs.hash(user.password, salt)
                .then(hashedPwd => {
                    // The password was hashed.
                    user.password = hashedPwd;
                    next();
                })
                .catch(err => {
                    console.log(`Error occurred when hasing ... ${err}`);
                });
        })
        .catch(err => {
            console.log(`Error occurred when salting ... ${err}`);
        });
});

//to export
const userModell = mongoose.model("User", userSchema);
const productModell = mongoose.model("Product", productSchema);
const categoryModell = mongoose.model("Category", categorySchema);
const cartModell = mongoose.model("Cart", cartSchema);

exports.userModel = userModell;
exports.productModel = productModell;
exports.categoryModel = categoryModell;
exports.cartModel = cartModell;


