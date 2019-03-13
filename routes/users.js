var express = require('express');
var router = express.Router();
const User = require('../models/users')
const axios = require('axios')
const bcrypt = require('bcryptjs')

router.post('/', async (req, res) => {
  const userName = await User.findOne({username: req.body.username})
  const userEmail = await User.findOne({email: req.body.email})
  if(userName) {
    res.json({message: "This username is already taken", isCreated: false})
  } else if(userEmail){
    res.json({message: "There is already an account attached to this email", isCreated: false})
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    const createdUser = await User.create(req.body)
    res.json({createdUser, isCreated: true})
  }
})

router.post('/login', async (req, res) => {
  try {
    const foundUser = await User.findOne({username: req.body.username})
    if(foundUser){
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.username = foundUser.username
        req.session.logged = true
        req.session.userId = foundUser._id
        console.log(req.session)
        req.session.save()
        res.json({foundUser, isLoggedIn: true})
      } else {
        res.json({message: "Incorrect password", isLoggedIn: false})
      }
    } else {
      res.json({message: "Username does not exist", isLoggedIn: false})
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
      res.json({isLoggedOut: true})
    }
  })
})


/* GET all users. */
router.get('/', async (req, res, next) => {
  try {
    const foundUsers = await User.find()
    res.json({users: foundUsers})
  } catch(err) {
    res.send(err)
  }
});

// GET User Profile
router.get('/:id', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id).populate('events')
    res.json({user: foundUser})
  } catch(err) {
    res.send(err)
  }
})

// EDIT User Profile
router.put('/:id', async (req, res, next) => {
  const userName = await User.findOne({username: req.body.username})
  const userEmail = await User.findOne({email: req.body.email})
  if(userName) {
    res.json({message: "This username is already taken", isUpdated: false})
  } else if(userEmail) {
    res.json({message: "There is already an account attached to this email"})
  } else {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, Object.assign(req.body), {new: true})
    res.json({updatedUser, isUpdated: true})
  }
})

// Delete User Profile
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id)
    res.json({
      status: 200,
      data: deletedUser
    })
  } catch(err) {
    res.send(err)
  }
})

module.exports = router;
