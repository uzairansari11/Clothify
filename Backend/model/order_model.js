const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  images: { type: [String], required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: { type: String, required: true },
  adress: { type: String, required: true }
});


const OrderModel=mongoose.model('order',orderSchema);

module.exports={OrderModel}