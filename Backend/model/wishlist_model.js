const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
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

const WishlistModel = mongoose.model("wishlist", wishlistSchema);

module.exports = { WishlistModel };
