const express = require("express");
const {
	getWishlist,
	postWishlist,
	updateWishlist,
	deleteWishlist,
} = require("../controller/wishlist_controller");

const WishlistRouter = express.Router();

WishlistRouter.get("/", getWishlist);
WishlistRouter.post("/", postWishlist);
WishlistRouter.patch("/:id", updateWishlist);
WishlistRouter.delete("/:id", deleteWishlist);

module.exports = { WishlistRouter };
