const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = mongoose.Schema({
    "county_region": String,
    "site_name": String,
    "created_by": String,
    "users": [{type: Schema.Types.ObjectId, ref: 'User'}]
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event