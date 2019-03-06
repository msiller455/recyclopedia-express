const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    events: [Number],
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

const User = mongoose.model('User', userSchema)

module.exports = User
