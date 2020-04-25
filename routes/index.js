const router = require('express').Router(); 
const homeController = require('../controllers/index'); 

router.get('/', homeController.index); 

router.use('/user/', require('./user')); 

module.exports = router; 