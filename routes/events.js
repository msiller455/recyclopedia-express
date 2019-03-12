var express = require('express');
var router = express.Router();
const Event = require('../models/events')
const User = require('../models/users')

router.post('/', async (req, res) => {
  const user =  await User.findById(req.body.created_by)
  const newEvent = {
    "county_region": req.body.county_region,
    "site_name": req.body.site_name,
    "created_by": req.body.created_by,
    "users": [user._id]
  }
  const createdEvent = await Event.create(newEvent)
  user.events.push(createdEvent._id)
  res.json(createdEvent)
})

/* GET all events. */
router.get('/', async function(req, res, next) {
  try {
    const foundEvents = await Event.find()
    res.json({events: foundEvents})
  } catch(err) {
    res.send(err)
  }
});


module.exports = router;