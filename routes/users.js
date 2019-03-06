var express = require('express');
var router = express.Router();
const User = require('../models/users')
const axios = require('axios')
const bcrypt = require('bcryptjs')


/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    console.log("hitting the route yo")
  } catch(err) {
    res.send(err)
  }
});



module.exports = router;
