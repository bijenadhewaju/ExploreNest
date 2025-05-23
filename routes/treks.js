var express = require('express');
var router = express.Router();

const trekList = require('../models/trek');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const allTreks = await trekList.find({});
  console.log(allTreks);

  res.render('treks/main', { title: 'Explore Nest',"trekList":allTreks });
});

router.get('/trekdetail', async function(req, res, next) {
  // const allTreks = await trekList.find({});
  // console.log(allTreks);

  res.render('treks/trekDetail');
});
module.exports = router;
