const express = require('express')
const router = express.Router()

const { ensureAuthenticated, isClient } = require('../config/auth')
const { getSearchPosts } = require('../controllers/product')
const { postAddCart,  getCart, postCheckout } = require('../controllers/client')

// client routes
router.get(
	'/search/:searchKeyword',
	ensureAuthenticated,
	isClient,
	getSearchPosts
)

router.get('/product/cart/:id', ensureAuthenticated, isClient, postAddCart)
router.get('/cart', ensureAuthenticated, isClient, getCart)
router.post('/checkout', ensureAuthenticated, isClient, postCheckout)

module.exports = router
