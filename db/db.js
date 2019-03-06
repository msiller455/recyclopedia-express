const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/recyclopedia', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})

mongoose.connection.on('error', (err) => {
    console.log(err, ' mongoose failed to connecgt')
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected')
})

mongoose.set('debug', true)