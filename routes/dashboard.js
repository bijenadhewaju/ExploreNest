var express = require("express");
var router = express.Router()
const trek = require("../models/trek.js");
const show = require("./routes/admin.js");

router.get("/",function(req,res){
    res.render("show", { title: "Trek Guide title"})
});


module.exports = router;