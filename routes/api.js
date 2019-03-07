var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/user', function(req, res, next) {
  res.render('index', { title: 'api' });
});

router.get('/bunny')

module.exports = router;