const mongoose = require('mongoose'); 
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat_db'; 

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}); 

const db = mongoose.connection; 

db.on('error', (err)=>{
    if(err){
        console.log("Error while connecting to db: " , err); 
        return; 
    }
}); 
db.once('open', ()=>{
    console.log("Mongodb Successfully connected!"); 
})

module.exports = db; 