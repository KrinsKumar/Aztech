//dependancies
const express = require('express');
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const clientSessions = require("client-sessions");
let mongoose = require('mongoose');
//modules
//const userAuth = require(`./userAuth.js`);
//const productData = require(`./product.js`);
//--------------------------------------------------------------------


//to be removed later if not being used
app.engine('.hbs', exphbs.engine({ extname: '.hbs',
    helpers: {
        navLink: function(url, options){
            return '<li' + 
                ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
                '><a href="' + url + '">' + options.fn(this) + '</a></li>';
        },
        safeHTML: function(context){
            return stripJs(context);
        },
        formatDate: function(dateObj){
            let year = dateObj.getFullYear();
            let month = (dateObj.getMonth() + 1).toString();
            let day = dateObj.getDate().toString();
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2,'0')}`;
        }
    }})
);

const productController = require("./controller/productController.js");
app.use("/product", productController);

app.set('view engine', '.hbs');

app.use(clientSessions({
    cookieName: "session", 
    secret: "ThisIsaSuperLongSecretKeyWithNumbers1234567890!@#$%^&*()", 
    duration: 60 * 60 * 1000 * 24 * 7, // 1 week
    activeDuration: 1000 * 60 * 60 * 24  // 1 day
}));

//middleware
function ensureLogin(req, res, next) { // checks the sessions
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      next();
    }
}

//-routes-------------------------------------------------------------------

const HTTP_PORT = process.env.PORT || 8080

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static("public"));

app.get("/", ensureLogin, (req,res) => {
    res.render('home', {
        layout: 'main'
    })
});

//------------------Products------------------

app.get("/category",ensureLogin, function (req, res) {
    productData.getAllCategories()
        .then((data) => {
            if (data.length > 0) {
                res.render("categories", { categories: data })
            }
            else {
                res.render("categories", { message: "no results" })
            }
        }).catch((err) => {
            res.render("categories", { message: "no results" })
        })
})

// app.get("/products", ensureLogin, (req,res) => {
//     productData.getAllProducts()
//     .then((data) => {
//         if (data.length > 0) {
//             res.render("product", { products: data })
//         }
//         else {
//             res.render("product", { message: "no results" })
//         }
//     }).catch((err) => {
//         res.render("product", { message: "no results" })
//     })
// });

//------------------User------------------
app.get("/register", (req,res) => {
    res.render('register', {
        layout: 'signUp'
    })
});

app.get("/login", (req,res) => {
    res.render('login', {
        layout: 'signIn'
    })
});

// for the pages that do not exist
app.use((req,res) => {
    res.render('404', {
      layout: 'main'  
    })
});

mongoose.connect("mongodb+srv://krinskumar2:12345678%40Kk@dbs311.8cc2ark.mongodb.net/urbanEase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    app.listen(HTTP_PORT, onHttpStart);
})
.catch(()=>{
    console.log("Error while connection to mongoDB");
})


//app.listen(HTTP_PORT, onHttpStart)
// productData.initialize()
// .then((userAuth.initialize))
// .then(() => {
//     app.listen(HTTP_PORT, onHttpStart)
// })
// .catch((err) => {
//     console.log(err);
// });