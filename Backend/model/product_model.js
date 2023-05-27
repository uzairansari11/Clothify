const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	ProductName: { type: String, required: true },
	productCategory: { type: String, required: true },
	productType: { type: String, required: true },
	brand: { type: String, required: true },
	price: { type: Number, required: true },
	discount: { type: Number },
	pic: { type: [String], required: true },
	description: { type: String, required: true },
	expiry: { type: Number, required: true },
	rating: { type: Number, default: 0, required: true },
	lifeStage: { type: String, required: true },
	weight: { type: Number, required: true },
});

const ProductModel = mongoose.model("Products", productSchema);

module.exports = {ProductModel}