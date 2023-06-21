const express = require("express");

const {
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controller/product_controller");
const { authorizedMiddleware } = require("../middleware/authorizedMiddleware");
const { adminMiddleware } = require('../middleware/adminMiddleware');

const productRouter = express.Router();

productRouter.get("/", adminMiddleware, getProduct);

productRouter.get("/:id", getSingleProduct);

productRouter.post("/", postProduct);

productRouter.patch("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

module.exports = { productRouter };
