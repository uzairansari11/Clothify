const express = require("express");

const {
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controller/product_controller");

const productRouter = express.Router();

productRouter.get("/", getProduct);

productRouter.get("/:id", getSingleProduct);

productRouter.post("/", postProduct);

productRouter.patch("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

module.exports = { productRouter };
