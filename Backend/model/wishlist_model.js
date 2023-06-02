const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
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

const WishlistModel = mongoose.model("wishlist", wishlistSchema);

module.exports = { WishlistModel };
