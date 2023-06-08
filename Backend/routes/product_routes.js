const express = require("express");

const {
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controller/product_controller");
const { authorizedMiddleware } = require("../middleware/authorizedMiddleware");

const productRouter = express.Router();

productRouter.get("/", getProduct);

productRouter.get("/:id", getSingleProduct);

productRouter.post("/", authorizedMiddleware, postProduct);

productRouter.patch("/:id", authorizedMiddleware, updateProduct);

productRouter.delete("/:id", authorizedMiddleware, deleteProduct);

module.exports = { productRouter };
