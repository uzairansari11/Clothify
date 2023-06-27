const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  items: [
    {
      type: Array,
      ref: "Product",
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
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = { OrderModel };
