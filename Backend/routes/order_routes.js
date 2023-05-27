const express = require("express");
const {
	getOrder,
	postOrder,
	updateOrder,
	deleteOrder,
} = require("../controller/order_controller");

const orderRouter = express.Router();

orderRouter.get("/", getOrder);

orderRouter.post("/", postOrder);

orderRouter.patch("/:id", updateOrder);

orderRouter.delete("/:id", deleteOrder);

module.exports = { orderRouter };
