const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number },
  images: { type: [String] },
  quantity: { type: Number, default: 1 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = { CartModel };
