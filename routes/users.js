var express = require('express');
var router = express.Router();
const User = require('../models/users')
const axios = require('axios')
const bcrypt = require('bcryptjs')

router.post('/', async (req, res) => {
  const password = req.body.password
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const userDbEntry = {}
  userDbEntry.username = req.body.username
  userDbEntry.name = req.body.name
  userDbEntry.email = req.body.email
  userDbEntry.password = hashedPassword
  try {
    const createdUser = await User.create(userDbEntry)
    req.session.username = createdUser.username
    req.session.logged = true
    req.session.userId = createdUser._id
    res.json({
      status: 200,
      data: createdUser
    })
  } catch(err) {
    res.send(err);
  }
})

router.post('/login', async (req, res) => {
  try {
    const foundUser = await User.findOne({username: req.body.username})
    if(foundUser){
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.message = ''
        req.session.username = foundUser.username
        req.session.logged = true
        req.session.userId = foundUser._id
        console.log('login route hitting')
        res.json({
          status: 200,
          data: foundUser
        })
      } else {
        req.session.message = "Incorrect username or password."
        console.log(req.session.message)
      }
    } else {
      req.session.message = "User does not exist"
      console.log(req.session.message)
    }
  } catch (err) {
    res.send(err)
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err)
    } else {
      console.log("user logged out")
    }
  })
})


/* GET all users. */
router.get('/', async (req, res, next) => {
  try {
    const foundUsers = await User.find()
    res.json({
      status: 200,
      data: foundUsers
    })
  } catch(err) {
    res.send(err)
  }
});

// GET User Profile
router.get('/:id', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id)
    console.log(foundUser)
    res.json({
      status: 200,
      data: foundUser
    })
  } catch(err) {
    res.send(err)
  }
})



module.exports = router;
