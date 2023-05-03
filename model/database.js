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
<<<<<<< HEAD
    "verified": {
        "type": Boolean,
        "default": false
    },
=======
    "carts": [{
        "cartID": Number,
        "owner": Boolean  // true if this user owns the cart
    }]
>>>>>>> 63f0db6c7211481366f4b2afae4626e032616e2f
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
    "description": [{ 
        "heading": String, 
        "text": String 
    }],
    "inventory": Number,
    "image": [String],
    "category": String,
    "agency": [String], // array of addresses of the photos of the agencies 
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
    "cartID": {
        "type": Number,
        "unique": true
    },
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


