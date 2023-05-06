//queries all the product and categories from the database
// and saves it in a variable
let mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const {
  userModel,
  productModel,
  categoryModel,
  cartModel,
} = require("../model/database.js");
const express = require("express");
const router = express.Router();

const getAllCategories = function () {
  return new Promise((resolve, reject) => {
    categoryModel
      .find({})
      .lean()
      .exec()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getAllProductsByCategory = function (val) {
  return new Promise((resolve, reject) => {
    productModel
      .find({ category: val })
      .lean()
      .exec()
      .then((data) => {
        data.forEach((item) => {
          if (item.inventory > 0) {
            item.available = true;
          }
        });
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const getAllProductsByTwoCategory = function (val, val2) {
  return new Promise((resolve, reject) => {
    productModel
      .find({ category: val })
      .lean()
      .exec()
      .then((data) => {
        let totalData;
        data.forEach((item) => {
          if (item.inventory > 0) {
            item.available = true;
          }
        });
        totalData = data;
        productModel
          .find({ category: val2 })
          .lean()
          .exec()
          .then((data) => {
            data.forEach((item) => {
              if (item.inventory > 0) {
                item.available = true;
              }
              totalData.push(item);
            });
            // totalData.push([data]);
            resolve(totalData);
          })
          .catch((err) => {
            reject(err);
          });
      });
  });
};

const getCategoryById = function (val) {
  return new Promise((resolve, reject) => {
    console.log(val);
    categoryModel.findOne({ "id": 1 })
      .lean()
      .exec()
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

router.get('/cat/1001', (req,res)=>{
getCategoryById(1).then((data)=>{
  console.log(data);
})
})

const getProductBySku = function (val) {
  return new Promise((resolve, reject) => {
    productModel
      .findOne({ sku: val })
      .lean()
      .exec()
      .then((product) => {
        getCategoryById(product.category)
          .then((category) => {
            product.categoryDetail = category
            resolve(product)
          })
      })
      .catch((err) => {
        reject(err);
      });
  });
};


router.get("/", (req, res) => {
  getAllCategories()
    .then((categories) => {
      const promises = categories.map(async (category) => {
        const products = await getAllProductsByCategory(category.id);
        category.products = products;
        return category;
      });

      Promise.all(promises)
        .then((categoryProducts) => {
          res.render("product", { layout: "main", catData: categoryProducts });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error retrieving products");
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving categories");
    });
});


function ensureCart(req, res, next) {
  if (!req.session.cart) {
    res.redirect("/cart");
  } else {
    next();
  }
}

router.get("/:sku", ensureCart, (req, res) => {
  const SKU = req.params.sku;
  let similarProducts, boughtTogether;
  getProductBySku(SKU)
    .then((data) => {
      getAllProductsByCategory(data.category).then((rel) => {
        similarProducts = rel;
        // if data.category is either 4 5 12
        if (data.category === 4 || data.category === 9) {
          getAllProductsByCategory(data.category - 3).then((boughtData) => {
            boughtTogether = boughtData;
            res.render("specificProduct", {
              layout: "main",
              product: data,
              relatedProducts: similarProducts,
              bundleProducts: boughtTogether,
            });
          });
        }
        // 10, 11, 12
        else if (
          data.category === 10 ||
          data.category === 11 ||
          data.category === 12
        ) {
          boughtTogether = [];
          let val;
          let val2;
          if (data.category === 10) { val = 11; val2 = 12 }
          else if (data.category === 11) { val = 10; val2 = 12 }
          else { val = 10; val2 = 11 }
          getAllProductsByTwoCategory(val, val2)
            .then((boughtData) => {
              boughtTogether = boughtData;
              // console.log(data, boughtTogether);
              res.render("specificProduct", {
                layout: "main",
                product: data,
                relatedProducts: similarProducts,
                bundleProducts: boughtTogether,
              });
            });
        } else {
          getAllProductsByCategory(data.category + 1).then((boughtData) => {
            boughtTogether = boughtData;
            res.render("specificProduct", {
              layout: "main",
              product: data,
              relatedProducts: similarProducts,
              bundleProducts: boughtTogether,
            });
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});



module.exports = router;
