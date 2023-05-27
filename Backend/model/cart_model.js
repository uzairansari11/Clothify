const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
	productName: { type: String, required: true },
	productCategory: { type: String, required: true },
	productType: { type: String, required: true },
	brand: { type: String },
	price: { type: Number, required: true },
	discount: { type: Number },
	pic: { type: [String] },
	quantity: { type: Number, default: 1 },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = { CartModel };
