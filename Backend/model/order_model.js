const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  items: [
    {
      brand: { type: String, required: true },
      price: { type: Number, required: true },
      discount: { type: Number },
      images: { type: [String], required: true },
      size: { type: mongoose.Schema.Types.Mixed, required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, require: true }
    },
  ],

  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  grandTotal: { type: Number, required: true },
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = { OrderModel };
