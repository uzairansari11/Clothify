const mongoose = require("mongoose");

const cartSchema = require({
	ProductName: { type: String, required: true },
	productCategory: { type: String, required: true },
	brand: { type: String },
	price: { type: Number, required: true },
	discount: { type: Number },
	pic: { type: [String] },
	quantity: { type: Number, default: 1 },
	users: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };
