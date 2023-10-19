require("dotenv").config();
var express = require("express");
var path = require("path");
var fileUpload = require("express-fileupload");

var app = express();

app.use(express.json());

app.use(fileUpload({}));
app.use(express.static(path.join(__dirname, "./public/upload/")));
app.use(express.urlencoded({ extended: true }));

var categories = require('./routes/categoryRoutes')

app.use("/", categories);
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log("server running on port 3300"));