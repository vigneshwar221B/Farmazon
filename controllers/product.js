const Product = require('../models/Product')
const User = require('../models/User')

const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const stringSimilarity = require('string-similarity')

exports.getProduct = async (req, res) => {
	const { id } = req.params

	let product = await Product.findById(id)
	const seller = await User.findById(product.seller)
	product = {
		...product._doc,
		seller: seller.name,
	}

	if (req.user.role == 'farmer')
		return res.render('farmer/product', { product })

	res.render('client/product', { product })
}

exports.getEditProduct = async (req, res) => {
	const { id } = req.params

	const product = await Product.findById(id)

	res.render('farmer/editProduct', { product })
}

exports.postEditProduct = async (req, res) => {
	let { name, desc, specs, price, image } = req.body
	const { id } = req.params

	let prod = await Product.findById(id)

	prod.name = name
	prod.desc = desc
	prod.specs = specs
	prod.price = price

	if (req.file) {
		unlinkAsync(prod.img)
		prod.img = req.file.path
	}

	await prod.save()

	res.redirect(`/product/${id}`)
}

exports.getDeleteProduct = async (req, res) => {
	const { id } = req.params

	await Product.findByIdAndDelete(id)

	req.flash('success_msg', 'product deleted successfully')
	res.redirect('/viewproducts')
}

exports.getSearchPosts = async (req, res) => {
	const { searchKeyword } = req.params

	let products = await Product.find({})

	products.forEach(el => {
		let accuracy = stringSimilarity.compareTwoStrings(searchKeyword, el.name)
		el.accuracy = accuracy
	})

	products.sort((a, b) => b.accuracy - a.accuracy)

	res.send(products)
}
