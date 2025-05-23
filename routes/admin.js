var express = require("express");
var router = express.Router()
const trek = require("../models/trek.js");
var trekking = require("../models/trek")


router.get("/",function(req,res){
    res.render("trek", { title: "Trek App title", trekList: trekking})
});
router.get("/add",function(req,res){
    res.render("admin/addtrek",{title: "Add Trek"}) //render view
});
router.post("/save", async function(req,res,next){
    try{const tour = await trek.create(req.body)
        
   return res.status(200).redirect("/trek")
    } catch(error){
        res.status(500).json({message: error.message})
    }
    
    
    
});
router.get("/edit/:_id", async function (req, res, next) {
 try{ const book =await Book.findById(req.params._id);

  // console.log(book)
  res.render("editTrek", { title: "Edit Trek", book });}
  catch(err){
      res.status(500).json({message:err.message})
  }
 
});
router.post('/saveEdited/:_id', async function(req, res, next){
  const book = await trek.findByIdAndUpdate(req.params._id, req.body)
  if (!book) {
    return res.status(404).json({message: "Error updating book"})
  }
  res.redirect('/trek')
 })

router.get('/delete/:id', function(req, res, next){
    console.log(req.params._id)
    const book= trekking.find((book)=>book._id=== req.params.id)
    const currIndex= trek.findIndex(book=> req.params._id=== book._id)
    books.splice(currIndex, 1);
    // Redirect to the homepage or send a success message
    res.redirect('/trek'); // Redirect to the homepage
});


module.exports = router;