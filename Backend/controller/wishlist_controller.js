const { WishlistModel } = require('../model/wishlist_model');
const { sendSuccess, sendError } = require('../utils/response');

const getWishlist = async (req, res) => {
  try {
    const wishData = await WishlistModel.find({ user: req.user.id });
    return sendSuccess(res, wishData, 'Wishlist fetched successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while fetching the wishlist');
  }
};

const postWishlist = async (req, res) => {
  const { title, category, subcategory, brand, price, discount, quantity, images, size, productId } = req.body;

  if (!title || !category || !subcategory || !brand || !price || discount === undefined || quantity === undefined || !images?.length || !size || !productId) {
    return sendError(res, 'Please provide all the details', 400);
  }

  try {
    let wishlistItem = await WishlistModel.findOne({ user: req.user.id, productId, size }).lean();

    if (wishlistItem) {
      if (wishlistItem.quantity >= 1) {
        return sendError(res, 'Item already in wishlist', 400);
      }
      wishlistItem = await WishlistModel.findOneAndUpdate(
        { user: req.user.id, productId, size },
        { $inc: { quantity: 1 } },
        { new: true }
      ).lean();
      return sendSuccess(res, wishlistItem, 'Wishlist item updated');
    }

    const newItem = new WishlistModel({
      title, category, subcategory, brand, price, discount,
      quantity, images, size, user: req.user._id, productId,
    });
    await newItem.save();
    return sendSuccess(res, newItem, 'Item added to wishlist', 201);
  } catch (error) {
    return sendError(res, 'An error occurred while adding to wishlist');
  }
};

const updateWishlist = async (req, res) => {
  try {
    const updatedItem = await WishlistModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return sendError(res, 'Item does not exist', 404);
    }
    return sendSuccess(res, updatedItem, 'Wishlist item updated');
  } catch (error) {
    return sendError(res, 'An error occurred while updating the wishlist item');
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const deletedItem = await WishlistModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedItem) {
      return sendError(res, 'Item does not exist', 404);
    }
    return sendSuccess(res, deletedItem, 'Item removed from wishlist');
  } catch (error) {
    return sendError(res, 'An error occurred while removing the wishlist item');
  }
};

module.exports = { getWishlist, postWishlist, updateWishlist, deleteWishlist };
