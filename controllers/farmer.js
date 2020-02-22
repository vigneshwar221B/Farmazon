const Product = require('../models/Product')

exports.getAddproducts = (req, res) => {
	res.render('farmer/addProducts')
}
exports.getViewproducts = async (req, res) => {
	const products = await Product.find({ seller: req.user })

	res.render('farmer/viewProducts', { products })
}
exports.getOrders = (req, res) => {
	res.render('farmer/orders')
}

exports.postAddProducts = async (req, res) => {
	const { name, desc } = req.body

	const product = new Product({
		name,
		desc,
		seller: req.user,
	})

	await product.save()

	res.redirect('/viewproducts')
}
