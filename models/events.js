const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = mongoose.Schema({
    "county_region": String,
    "site_name": String,
    
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event