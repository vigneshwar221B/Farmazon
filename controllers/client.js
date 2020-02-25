const Product = require('../models/Product')
const Cart = require('../models/Cart')

exports.postAddCart = async (req, res) => {
	const { id } = req.params
	try {
		const product = await Product.findById(id)
		let cart = await Cart.findOne({ user: req.user })

		if (!cart) {
			cart = new Cart()
			cart.user = req.user
		}

		let products = [...cart.products]
		let isAlready = false
		products.forEach(el => {
			if (el.productId + '' == product._id + '') isAlready = true
		})

		if (isAlready) {
			req.flash('error_msg', 'product already exist in ur cart')
			res.redirect('back')
		} else {
			products.push({
				productId: id,
				quantity: 10,
			})

			cart.products = products
			await cart.save()

			req.flash('success_msg', 'product added to ur cart')
			res.redirect('back')
		}
	} catch (err) {
		console.log(err)

		req.flash('error_msg', 'something is wrong with the product id')
		res.redirect('/dashboard')
	}
}

exports.getCart = (req, res) => {
	Cart.findOne({ user: req.user._id })
		.populate('products.productId')
		.exec()
		.then(cart => {
			console.log(cart.products)

			res.render('client/cart', {
				products: cart.products,
			})
		})
		.catch(err => {
			req.flash('error_msg', 'cant get cart')
			res.redirect('back')
		})
}

exports.postCheckout = (req, res) => {
	console.log(req.body)
	const {ids, user} = req.body

	

	res.send('hi')
}
