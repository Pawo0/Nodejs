const mongoose = require('mongoose')

const JobsSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide company name"],
        maxLength: 100
    },
    position: {
        type: String,
        required: [true, "Please provide position"],
        maxLength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, {timestamps: true})


module.exports = mongoose.model('Job', JobsSchema)