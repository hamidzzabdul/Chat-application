const express = require('express')

const viewController = require('../controllers/viewController')
const authController = require('../controllers/adminController')
const userController = require('../controllers/userController')
const router = express.Router();

router.get('/',authController.protect,viewController.getOverview)
router.get('/register', viewController.getSignUp)
router.get('/login',viewController.getLogin)
// router.get('/', authController.isLoggedIn,viewController.getOverview)
module.exports = router