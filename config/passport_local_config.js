const passport = require('passport'), LocalStrategy = require('passport-local').Strategy; 
const User = require('../models/user'); 

passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'
}, async (email, password, done)=>{ 
    try{
        let user = await User.findOne({email: email}); 
        if(user && user.password == password){
            return done(null, user); 
        }else{
            return done(null, false); 
        }
    }catch(err){
        console.log("Error while using local strategy!(passport_local_config.js)"); 
        return done(err); 
    }
})); 

passport.serializeUser((user, done)=>{
    return done(null,user.id); 
}); 

passport.deserializeUser(async (id, done)=>{
    try{
        let user = await User.findById(id); 
        if(user){
            return done(null, user); 
        }
        return done(null, false); 
    }catch(err){
        console.log("Error while deserializing user.(passport_local_config.js)"); 
        return done(err); 
    }
}); 

module.exports = passport; 