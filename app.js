const apiRoutes = require("./routes/api-routes.js")
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var port = process.env.port || 3000;


mongoose.connect("mongodb://localhost/resthub", {useNewUrlParser: true});
var db = mongoose.connection;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use("/api",apiRoutes);
app.get("/",(req,res)=> res.send("hello world"));
app.listen(port, function(){
    console.log("Port 3000 open")
});