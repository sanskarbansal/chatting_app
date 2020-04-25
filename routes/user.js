const router = require('express').Router(); 
const userController = require('../controllers/user');
const passport = require('passport'); 

router.post('/create', userController.createUser); 
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user/dashboard', 
    failureRedirect: '/', 
    failureFlash: 'Incorrect Email/Password!'
})); 
router.get('/dashboard', userController.dashboard); 
router.get('/logout', userController.logout); 
module.exports = router; 