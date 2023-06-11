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
  size: { type: mongoose.Schema.Types.Mixed },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  }
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = { CartModel };
