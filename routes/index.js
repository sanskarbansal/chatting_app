const router = require('express').Router(); 
const homeController = require('../controllers/index'); 
const Token = require('../models/token'); 
const User = require('../models/user'); 
router.get('/', homeController.index); 
router.use('/user/', require('./user')); 

router.get('/confirmation/:token', async (req, res) => {
    let token = req.params.token; 
    let foundToken = await Token.findOne({accessToken: token}); 
    if(foundToken){
        let user = await User.findOne(foundToken.user); 
        user.isVerified = true; 
        user.save(); 
        req.flash('message', 'Email Verified Successully!'); 
    }else{
        req.flash('message', 'Sorry, please sign up again.); 
    }
    res.redirect('/'); 

}); 

module.exports = router; 