const mongoose = require('mongoose'),
	findOrCreate = require('mongoose-findorcreate')

const OrderSchema = new mongoose.Schema({
	products: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true,
			},
			quantity: { type: Number, required: true },
		},
	],
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

OrderSchema.plugin(findOrCreate)

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order
