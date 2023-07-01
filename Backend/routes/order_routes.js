const express = require("express");
const {
	getOrder,
	postOrder,
	updateOrder,
	deleteOrder,
	getOrderByAdmin,
} = require("../controller/order_controller");
const { authorizedMiddleware } = require('../middleware/authorizedMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');

const orderRouter = express.Router();

orderRouter.get("/", authorizedMiddleware, getOrder);

orderRouter.post("/", authorizedMiddleware, postOrder);

orderRouter.patch("/:id", updateOrder);

orderRouter.delete("/:id", deleteOrder);

orderRouter.get("/admin", adminMiddleware, getOrderByAdmin);
module.exports = { orderRouter };
