var express = require("express");
var router = express.Router()
const trek = require("../models/trek.js");

router.get("/",function(req,res){
    res.render("./dashboard/index.js", { title: "User Page", completedList: trekking})
});

router.get("/",function(req,res){
    res.render("admin", { title: "Admin Page", whistList: trekking})
});
module.exports = router;