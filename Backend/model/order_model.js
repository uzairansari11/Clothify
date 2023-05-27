const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
	productName: { type: String, required: true },
	productCategory: { type: String, required: true },
	productType: { type: String, required: true },
	brand: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, default: 1 },
	pic: { type: [String], required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	date: { type: String, required: true },

});


const OrderModel=mongoose.model('order',orderSchema);

module.exports={OrderModel}