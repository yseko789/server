
const mongoose = require('mongoose')

const RamenSchema = new mongoose.Schema({
    name: String,
    price: Number,    
})

module.exports = mongoose.model('Ramen', RamenSchema)