const { CartModel } = require('../model/cart_model');
const { sendSuccess, sendError } = require('../utils/response');

const getCart = async (req, res) => {
  try {
    const cartData = await CartModel.find({ user: req.user.id });
    return sendSuccess(res, cartData, 'Cart fetched successfully');
  } catch (error) {
    return sendError(res, 'Something went wrong');
  }
};

const postCart = async (req, res) => {
  const { title, category, subcategory, brand, price, discount, quantity, images, size, productId } = req.body;

  if (!title || !category || !subcategory || !brand || !price || discount === undefined || !quantity || !images?.length || !size || !productId) {
    return sendError(res, 'Please provide all the details', 400);
  }

  try {
    let cartItem = await CartModel.findOne({ user: req.user.id, productId, size }).lean();

    if (cartItem) {
      if (cartItem.quantity >= 10) {
        return sendError(res, 'Quantity cannot exceed 10', 400);
      }
      cartItem = await CartModel.findOneAndUpdate(
        { user: req.user.id, productId, size },
        { $inc: { quantity: 1 } },
        { new: true }
      ).lean();
      return sendSuccess(res, cartItem, 'Cart item updated');
    }

    const newCartItem = new CartModel({
      title, category, subcategory, brand, price, discount,
      quantity, images, size, user: req.user._id, productId,
    });
    await newCartItem.save();
    return sendSuccess(res, newCartItem, 'Item added to cart', 201);
  } catch (error) {
    return sendError(res, 'An error occurred while adding to cart');
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedItem = await CartModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return sendError(res, 'Item does not exist', 404);
    }
    return sendSuccess(res, updatedItem, 'Cart item updated');
  } catch (error) {
    return sendError(res, 'Something went wrong');
  }
};

const deleteCart = async (req, res) => {
  try {
    const deletedItem = await CartModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedItem) {
      return sendError(res, 'Item does not exist', 404);
    }
    return sendSuccess(res, deletedItem, 'Item removed from cart');
  } catch (error) {
    return sendError(res, 'Something went wrong');
  }
};

const deleteAllCart = async (req, res) => {
  try {
    await CartModel.deleteMany({ user: req.user.id });
    return sendSuccess(res, [], 'Cart cleared successfully');
  } catch (error) {
    return sendError(res, error.message);
  }
};

module.exports = { getCart, postCart, updateCart, deleteCart, deleteAllCart };
