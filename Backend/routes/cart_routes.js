const express = require('express');
const {
  getCart,
  postCart,
  updateCart,
  deleteCart,
  deleteAllCart,
} = require('../controller/cart_controller');

const cartRouter = express.Router();

cartRouter.get('/', getCart);
cartRouter.post('/', postCart);
cartRouter.patch('/:id', updateCart);
cartRouter.delete('/:id', deleteCart);
cartRouter.delete('/', deleteAllCart);

module.exports = { cartRouter };
