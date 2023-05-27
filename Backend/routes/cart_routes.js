const express = require("express");
const {
	getCart,
	postCart,
	updateCart,
	deleteCart,
} = require("../controller/cart_controller");
const { authorizedMiddleware } = require("../middleware/authorizedMiddleware");

const cartRouter = express.Router();

cartRouter.get("/", getCart);
cartRouter.post("/", postCart);
cartRouter.patch("/:id", updateCart);
cartRouter.delete("/:id", deleteCart);

module.exports = { cartRouter };
