const mongoose = require('mongoose'); 

const tokenSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    }, 
    accessToken: {
        type: String, 
        required: true
    }, 
    createdAt: {
        type: Date, 
        expires: 1000*60*45
    }
}); 

module.exports = mongoose.model('token', tokenSchema); 