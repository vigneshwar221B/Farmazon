const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	specs: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
