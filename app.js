var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get('/',(req, res)=>{
    res.render("dashboard");
})

app.listen(3000, ()=>{
    console.log("Academia has started!!");
})