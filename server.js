//dependancies
const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
let mongoose = require('mongoose');
const clientSessions = require("client-sessions");

//controllers
const productController = require("./controller/productController.js");
const userController = require("./controller/userController.js");
const cartController = require("./controller/cartController.js");
const pathController = require("./controller/pathwayController.js");
const chatController = require("./controller/chatController.js");

//------------------------------------------------------------------------------
//to be removed later if not being used
app.engine('.hbs', exphbs.engine({ extname: '.hbs',
    helpers: {
        ifeq: function(a, b, options) {
            if (a == b) { return options.fn(this); }
        },
        ifmore: function(a, b, options) {
            if (a > b) { return options.fn(this); }
        },
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
        },
        ini: function(a, options){
            return a[0].toUpperCase();
        },
        discount: function(price, discount){
            return price - (price * (discount/100));
        },
        displayCart: function(cartName, cartID, options){
            if (cartName) return cartName
            else {
                console.log(typeof(cartID) + " + " + cartID)
                return cartID
                return cartID.substr(1, cartID.length)
            }
        },
        calcTotal: function(Products){
            total = 0
            Products.forEach(product => {
                total += product.price * product.quantity 
            })
            return total
        }
    }})
);
app.set('view engine', '.hbs');
app.set('layout', 'main');

//express configurations
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/public")));

app.use(clientSessions({
    cookieName: "session", 
    secret: "ThisIsaSuperLongSecretKeyWithNumbers1234567890!@#$%^&*()", 
    duration: 60 * 60 * 1000 * 24 * 7, // 1 week
    activeDuration: 1000 * 60 * 60 * 24  // 1 day
}));

app.use(function(req,res,next) {
    res.locals.session = req.session;
    next();
})


//-routes-------------------------------------------------------------------

const HTTP_PORT = process.env.PORT || 8080

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.use("/", userController);
app.use("/product", productController);
app.use("/cart", cartController);
app.use("/pathway", pathController);
app.use("/chat", chatController);


app.get("/", (req, res)=>{
    res.render("home", {layout: "main"})
})

app.get("/noaccess", (req, res)=>{
    res.render("noaccess", {
        layout: "main"
    })
})

// for the pages that do not exist
app.use((req,res) => {
    res.render('404', {
      layout: 'main'  
    })
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    app.listen(HTTP_PORT, onHttpStart);
})
.catch(()=>{
    console.log("Error while connection to mongoDB");
})