const User = require('../models/user'), Token = require('../models/token'); 
const crypto = require('crypto'); 
const transporter = require('../config/mailer_config'); 

module.exports.createUser = async function(req, res){
    try{

        let user = await User.findOne({email: req.body.email}); 
        if(!user){
            let user = await User.create({
                name: req.body.name, 
                email: req.body.email, 
                password: req.body.password
            });
            if(user){
                let token = await Token.create({
                    _userId: user._id, 
                    accessToken: crypto.randomBytes(20).toString('hex')
                }); 
                let msg = {
                    from: process.env.USER || '<email>', 
                    to: user.email, 
                    subject: 'Account Verification Chatting Engine', 
                    text: `Please confirm your email by visiting this link: http://${req.headers.host}/confirmation/${token.accessToken}.` 
                }
                transporter.sendMail(msg, (err, info)=>{
                    if(err){
                        console.log("Error while sending email."); 
                        return; 
                    }
                    console.log(info); 
                }); 
            } 
        }
    }catch(err){
        console.log("Error", err); 
    }
    req.flash('message', 'User Successfully Created!, Please confirm your email once.'); 
    res.redirect('back'); 
}

module.exports.dashboard = function(req, res){
    if(req.isAuthenticated() && req.user.isVerified){
        res.render('profile', {title: "Welcome " + req.user.name, user: req.user}); 
    }else{
        req.flash('message', "User is not verified please verify your email once."); 
        res.redirect('/'); 
    }
}

module.exports.logout = function(req, res){
    if(req.user && req.user.isVerified){
        req.logout(); 
        req.flash('message', "Logout Successfully!"); 
    }
    res.redirect('/'); 
}