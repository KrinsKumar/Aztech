const express = require('express');
const app = express();
const path = require("path");
const dotenv = require('dotenv').config();

//--------------------------------------------------------------------

//--------------------------------------------------------------------

const HTTP_PORT = process.env.PORT || 8080

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}


app.listen(HTTP_PORT, onHttpStart)