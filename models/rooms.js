const mongoose = require('mongoose'); 

const roomSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    }, 
    to: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    }, 
    roomNo: {
        type: String, 
        required: true
    } 
}, {
    timestamps: true 
}); 

module.exports = mongoose.model('room', roomSchema); 