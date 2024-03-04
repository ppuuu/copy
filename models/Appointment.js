const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    apptDate: {
        type: Date,
        requried:true
    },
    user: {
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },
    massageshop: {
        type:mongoose.Schema.ObjectId,
        ref: 'massageshop',
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Appointment',AppointmentSchema);