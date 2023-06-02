const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  images: { type: [String], required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0 },
  total_rating: { type: Number, default: 0 },
  sizes: { type: [Number | String], required: true },
  quantity: { type: Number, required: true },
});

const ProductModel = mongoose.model("Products", productSchema);

module.exports = {ProductModel}