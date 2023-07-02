const { WishlistModel } = require("../model/wishlist_model");

// Get wishlist items for the logged-in user
const getWishlist = async (req, res) => {
  try {
    const wishData = await WishlistModel.find({ user: req.user.id });
    res.status(200).json(wishData);
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

// Add a product to the wishlist
const postWishlist = async (req, res) => {
  const {
    title,
    category,
    subcategory,
    brand,
    price,
    discount,
    quantity,
    images,
    size,
    productId,
  } = req.body;

  if (
    !title ||
    !category ||
    !subcategory ||
    !brand ||
    !price ||
    discount === undefined ||
    quantity === undefined ||
    images.length === 0 ||
    !size ||
    !productId
  ) {
    return res.status(400).json({ error: "Please provide all the details" });
  } else {
    try {
      let wishlistItem = await WishlistModel.findOne({
        user: req.user.id,
        productId,
        size,
      }).lean();

      if (wishlistItem) {
        if (wishlistItem.quantity >= 1) {
          return res.status(400).json({ error: "Quantity cannot exceed 1" });
        }
        wishlistItem = await WishlistModel.findOneAndUpdate(
          { user: req.user.id, productId, size },
          { $inc: { quantity: 1 } },
          { new: true }
        ).lean();
        res.status(200).json(wishlistItem);
      } else {
        const wishlistDetails = new WishlistModel({
          title,
          category,
          subcategory,
          brand,
          price,
          discount,
          quantity,
          images,
          size,
          user: req.user._id,
          productId,
        });

        await wishlistDetails.save();
        res.status(200).json(wishlistDetails);
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while posting the new product" });
    }
  }
};

// Update a wishlist item
const updateWishlist = async (req, res) => {
  const payload = req.body;
  const productId = req.params.id;
  try {
    const updatedItem = await WishlistModel.findByIdAndUpdate(
      { _id: productId, user: req.user.id },
      payload,
      {
        new: true,
      }
    );
    if (!updatedItem) {
      res.status(400).json({ message: "Item does not exist" });
    } else {
      res.status(200).json(updatedItem);
    }
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

// Delete a wishlist item
const deleteWishlist = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedItem = await WishlistModel.findByIdAndDelete(
      { _id: productId },
      { user: req.user.id }
    );
    if (!deletedItem) {
      res.status(400).json({ message: "Item does not exist" });
    } else {
      res
        .status(200)
        .json({ data: deletedItem, message: "Item deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

module.exports = {
  getWishlist,
  postWishlist,
  updateWishlist,
  deleteWishlist,
};
