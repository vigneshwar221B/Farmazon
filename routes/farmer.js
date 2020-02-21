const express = require('express')
const router = express.Router()

const { ensureAuthenticated, isFarmer } = require('../config/auth')
const {
	getAddproducts,
	getOrders,
	getViewproducts,
} = require('../controllers/farmer')

// Farmer routes
router.get('/addproducts', ensureAuthenticated, isFarmer, getAddproducts)
router.get('/viewproducts', ensureAuthenticated, isFarmer, getViewproducts)
router.get('/orders', ensureAuthenticated, isFarmer, getOrders)

module.exports = router
