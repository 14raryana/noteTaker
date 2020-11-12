// This will be your standard server.js file where you
// will initialize the server 
var express = require("express");
var app = express();
var path = require("path");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api",apiRoutes);
app.use("/",htmlRoutes);

app.listen(PORT, function(){
    console.log("App listening on port: " + PORT);
})