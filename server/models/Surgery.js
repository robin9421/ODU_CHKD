var mongoose = require('mongoose');


var surgerySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    cordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    prescription: {
        type: String,
        required: true
    },
    Instructions: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('Surgery', surgerySchema);