const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
    providerId: {
        type: Number,
        required: [true, 'Please provide an provider ID.'],
    },
    logo:{
        type: String,
        required: [true, 'Please provide an logo.'],
        unique: true
    },
    name:{
        type: String,
        required: [true, 'Please provide a name.'],
        minlength: 3,
        maxlength: 30
    },
    rate:{
        type: Number,
        required: [true, 'Please provide a rate.']
    },
    startDate:{
        type: Date
    },
    endDate:{
        type: Date
    },
    reminderDate:{
        type: Date
    }
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)