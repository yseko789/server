
const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title.'],
        minlength: 3,
        maxlength: 50,
    },
    movieId:{
        type: Number,
        required: [true, 'Please provide a movie ID.']
    },
    subscriptions: []
    
})