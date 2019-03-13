const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}],
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

const User = mongoose.model('User', userSchema)

module.exports = User
