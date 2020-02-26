const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Order = require('../models/Order')

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
			res.render('client/cart', {
				products: cart.products,
				cartId: cart._id,
			})
		})
		.catch(err => {
			req.flash('error_msg', 'cant get cart')
			res.redirect('back')
		})
}

exports.postCheckout = async (req, res) => {
	const { cartId } = req.body

	const cart = await Cart.findById(cartId)
		.populate('products.productId')
		.exec()

	const products = cart.products

	products.forEach(el => {
		Order.findOne({ from: req.user, to: el.productId.seller })
			.then(order => {
				if (!order) {
					order = new Order()
				}
				const orderProducts = [...order.products]

				orderProducts.push(el)
				order.products = orderProducts
				order.from = req.user
				order.to = el.productId.seller

				order.save().then(() => {
					//delete the cart
					Cart.findByIdAndDelete(cartId).then(() => {
						res.send('done bish')
					})
				})
			})
			.catch(err => console.log(err))
	})
}

exports.getHistory = async(req, res) => {
	const orders = await Order.findOne({ from: req.user })
		.populate('products.productId')
		.exec()
	if(!orders)
		return res.render('client/history', {orders: null})

	res.render('client/history', {orders})
}