const Product = require('../models/Product')
const Order = require('../models/Order')

exports.getAddproducts = (req, res) => {
	res.render('farmer/addProducts')
}
exports.getViewproducts = async (req, res) => {
	const products = await Product.find({ seller: req.user })

	res.render('farmer/viewProducts', { products })
}
exports.getOrders = async (req, res) => {
	const orders = await Order.findOne({ to: req.user })
		.populate('products.productId')
		.exec()
	if(!orders)
		return res.render('farmer/orders', {orders: null})

	res.render('farmer/orders', {orders})
}

exports.postAddProducts = async (req, res) => {
	const { name, desc, specs, price } = req.body
	console.log(req.file)

	const product = new Product({
		name,
		desc,
		specs,
		price,
		img: req.file.path,
		seller: req.user,
	})

	await product.save()

	res.redirect('/viewproducts')
}
