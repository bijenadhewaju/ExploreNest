var express = require('express');
var router = express.Router();
const trek = require('../models/trek.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ExploreNest' });
});

module.exports = router;
