const mongoose = require('mongoose');

//------------ Item Schema ------------//
const CartSchema = new mongoose.Schema({
	nyxcipher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Nyxcipher' },
	ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
}, { timestamps: true });

CartSchema.pre('save', async function(next) {
	console.log('just before saving CartSchema... ');
	next();
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;