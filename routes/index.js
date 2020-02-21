const express = require('express')
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')
const { getDashboard, getIndex } = require('../controllers/main')
// Welcome Page
router.get('/', forwardAuthenticated, getIndex)

// Dashboard
router.get('/dashboard', ensureAuthenticated, getDashboard)

module.exports = router
