const express = require('express')
const router = express.Router()

const { ensureAuthenticated, isClient } = require('../config/auth')

// client routes

module.exports = router
