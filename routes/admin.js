var express = require("express");
var router = express.Router();
const Trek = require("../models/trek");
const upload =require("../middleware/uploads");

router.get("/", async function (req, res) {
  try {
    const treks = await Trek.find(); 
    res.render("trek", { title: "Trek App", trekList: treks });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Show add form
router.get("/add", function (req, res) {
  res.render("admin/addtrek", { title: "Add Trek" });
});


router.post("/save", upload.array("photos", 5), async (req, res) => {
  console.log("FILES:", req.files); // DEBUG
  console.log("BODY:", req.body);   // DEBUG

  try {
    const trekData = { ...req.body };

    if (req.files && req.files.length > 0) {
      trekData.images = req.files.map(file => file.filename);
    }

    await Trek.create(trekData);
    res.redirect("/trek");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating trek");
  }
});

// routes/treks.js or admin.js
router.get("/list", async (req, res) => {
  try {
    const treks = await Trek.find(); // Get all treks from DB
    res.render("trek-list", { treks });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const trek = await Trek.findById(req.params._id);
    if (!trek) return res.status(404).send("Trek not found");
    res.render("treks/trekDetail", { trek });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get("/trek/:id", async (req, res) => {
  console.log("Fetching trek with ID:", req.params.id);
  try {
    const trek = await Trek.findById(req.params.id);
    if (!trek) return res.status(404).send("Trek not found");
    res.render("treks/trekDetail", { trek }); // Make sure this matches your EJS file name
  } catch (err) {
    console.error("Error fetching trek:", err);
    res.status(500).send("Server error");
  }
});

// Show edit form
// GET /admin/edit/123456
router.get("/edit/:id", async (req, res) => {
  try {
    const trek = await Trek.findById(req.params.id);
    if (!trek) return res.status(404).send("Trek not found");
    res.render("admin/edittrek", { trek });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Handle edit form submission
router.post("/edit/:id", async (req, res) => {
  console.log("Received EDIT request for ID:", req.params.id);
  try {
    const updatedTrek = await Trek.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTrek) {
      return res.status(404).send("Trek not found");
    }
    console.log("Updated Trek:", updatedTrek);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error Updating Trek:", err);
    res.status(500).send("Error updating trek");
  }
});
router.post("/delete/:id", async (req, res) => {
  console.log("Received DELETE request for ID:", req.params.id);
  try {
    const deletedTrek = await Trek.findByIdAndDelete(req.params.id);
    if (!deletedTrek) {
      return res.status(404).send("Trek not found");
    }
    console.log("Deleted Trek:", deletedTrek);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error Deleting Trek:", err);
    res.status(500).send("Error deleting trek");
  }
});
module.exports = router;