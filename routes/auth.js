const express = require('express')
const router = express.Router()

const { forwardAuthenticated } = require('../config/auth')
const {
	getLogin,
	getFarmerRegister,
	getProfile,
	getLogout,
	getRegister,
	postLogin,
	postRegister,
} = require('../controllers/auth')

// Login Page
router.get('/login', forwardAuthenticated, getLogin)

// Register Page
router.get('/register', forwardAuthenticated, getRegister)

// Register
router.post('/register', postRegister)

// Login
router.post('/login', postLogin)

// Logout
router.get('/logout', getLogout)

//myprofile
router.get('/myprofile', getProfile)

router.get('/farmerRegister', getFarmerRegister)

module.exports = router
