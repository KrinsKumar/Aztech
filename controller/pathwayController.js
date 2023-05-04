let mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bcryptjs = require("bcryptjs");
const express = require("express");
const app = express();
const router = express.Router();
const {userModel, productModel, categoryModel, cartModel} = require('../model/database.js')

//middleware

app.use(function(req,res,next) {
    res.locals.session = req.session;
    next();
})

function ensureLogin(req, res, next) { 
    if (!req.session.user) {
      res.redirect("/login");
    } else {
    if (!req.session.user.userName) {
            res.redirect("/login");
        } else {
        next();
        }
    }
}

function ensureCart(req, res, next) { 
    if (!req.session.user) {
        res.redirect("/login");
      } else {
      if (!req.session.user.cart) {
              res.redirect("/product");
          } else {
          next(); 
          }
      }
}

//function
const getAllProductsByCategory = function (categoryID) {
    return new Promise((resolve, reject) => {
        productModel.find({ category: categoryID }).lean()
            .exec()
            .then((data) => {
                data.forEach((item) => {
                    if (item.inventory > 0) {
                        item.available = true;
                    }
                })
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}


///2 pathways- 4000 series and fx-400 series
///4000 series
// clicking on the product will take you to a new product tab

router.get("/4k/1", ensureLogin, ensureCart, (req, res) => {
    //create new cart add that to the useres accounts cart array
    //products from 6 max 250
    //get the max value from the cart for the id
    getAllProductsByCategory('6')
    .then((data) => {
        cartID = req.session.user.cartID;
        cartModel.findOne({cartID}).lean().exec()
        .then((cart) => {
            res.render("path", {
                products: data,
                index: 1,
                cart
            })
        })
    })

});

router.post("/4k/1", (req, res) => {

})

router.get("/4k/2", ensureLogin, (req, res) => {
    //get the bases from 7
    //qty = the qty from 6
    getAllProductsByCategory('7')
    .then((data) => {
        res.render("path", {
            products: data,
            index: 2
        })
    })
});

router.get("/4k/3", ensureLogin, (req, res) => {
    //need 1, propmt if they proceed without this checked
    getAllProductsByCategory('8')
    .then((data) => {
        res.render("path", {
            products: data,
            index: 3
        })
    })
});

router.get("/4k/4", ensureLogin, (req, res) => {
    //qty must be equal to the 6
    getAllProductsByCategory('9')
    .then((data) => {
        res.render("path", {
            products: data,
            index: 4
        })
    })
});

router.get("/4k/5", ensureLogin, (req, res) => {
    //display 10 11 12
});


module.exports = router;
