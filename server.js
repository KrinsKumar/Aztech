const express = require('express');
const app = express();
const path = require("path");
const dotenv = require('dotenv').config();
const exphbs = require("express-handlebars");

//--------------------------------------------------------------------

app.use(express.static("public"));

app.engine('.hbs', exphbs.engine({ extname: '.hbs',
    helpers: {
        navLink: function(url, options){
            return '<li' + 
                ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
                '><a href="' + url + '">' + options.fn(this) + '</a></li>';
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
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

//--------------------------------------------------------------------

const HTTP_PORT = process.env.PORT || 8080

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", (req,res) => {
    res.render('home', {
        layout: 'main'
    })
});

// for the pages that do not exist
app.use((req,res) => {
    res.render('404', {
      layout: 'main'  
    })
});

app.listen(HTTP_PORT, onHttpStart)