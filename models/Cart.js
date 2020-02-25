const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
	products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: { type: Number, required: true }
    }
  ],
	user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart
