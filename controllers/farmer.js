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
	const { name, desc, specs } = req.body
	console.log(req.file);
	

	const product = new Product({
		name,
		desc,
		specs,
		img: req.file.path,
		seller: req.user,
	})

	await product.save()

	res.redirect('/viewproducts')
}
