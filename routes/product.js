const express = require('express')
const router = express.Router()

const { ensureAuthenticated, isFarmer } = require('../config/auth')
const { getProduct, getEditProduct, postEditProduct } = require('../controllers/product')

router.get('/product/:id', ensureAuthenticated, getProduct)
router.get('/product/edit/:id', ensureAuthenticated, isFarmer, getEditProduct)
router.post('/product/edit/:id', ensureAuthenticated, isFarmer, postEditProduct)

module.exports = router
