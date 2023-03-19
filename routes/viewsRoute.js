const express = require('express')

const viewController = require('../controllers/viewController')
const authController = require('../controllers/adminController')
const router = express.Router();

router.get('/login', viewController.getLogin)
router.get('/register', viewController.getSignUp)
router.get('/',viewController.getOverview)
// router.get('/', authController.isLoggedIn,viewController.getOverview)
module.exports = router