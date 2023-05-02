//dependancies
const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
let mongoose = require('mongoose');

//controllers
const productController = require("./controller/productController.js");
const userController = require("./controller/userController.js");

//------------------------------------------------------------------------------
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
app.set('view engine', '.hbs');
app.set('layout', 'main');

//express configurations
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


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

app.use("/", userController);
app.use("/product", productController);

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