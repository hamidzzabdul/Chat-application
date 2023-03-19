const express = require('express')
const authController = require('../controllers/adminController')
const userController = require('../controllers/userController')
const router = express.Router();

router.post('/register', authController.signUp)
router.post('/login', authController.loginUser)
router.get('/logout', authController.logout);

router
    .route('/getAllUsers')
    .get(authController.protect,authController.restrictTo('admin'), userController.getAllusers)
    
module.exports = router;