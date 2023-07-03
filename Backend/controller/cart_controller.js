const { CartModel } = require('../model/cart_model');

// Get cart items for a user
const getCart = async (req, res) => {
  try {
    const cartData = await CartModel.find({ user: req.user.id });
    res.status(200).json(cartData);
  } catch (error) {
    res.status(500).json({ error: 'Something Went Wrong' });
  }
};

// Add an item to the cart
const postCart = async (req, res) => {
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
    !quantity ||
    !images.length ||
    !size ||
    !productId
  ) {
    return res.status(400).json({ error: 'Please provide all the details' });
  }

  try {
    let cartItem = await CartModel.findOne({
      user: req.user.id,
      productId,
      size,
    }).lean();

    if (cartItem) {
      if (cartItem.quantity >= 10) {
        return res.status(400).json({ error: 'Quantity cannot exceed 10' });
      }
      cartItem = await CartModel.findOneAndUpdate(
        { user: req.user.id, productId, size },
        { $inc: { quantity: 1 } },
        { new: true },
      ).lean();
      res.status(200).json(cartItem);
    } else {
      const cartDetails = new CartModel({
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

      await cartDetails.save();
      res.status(200).json(cartDetails);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while posting the new product' });
  }
};

// Update cart item
const updateCart = async (req, res) => {
  const payload = req.body;
  const productId = req.params.id;
  try {
    const updatedItem = await CartModel.findByIdAndUpdate(
      { _id: productId, user: req.user.id },
      payload,
      { new: true },
    );
    if (!updatedItem) {
      res.status(400).json({ message: 'Item does not exist' });
    } else {
      res.status(200).json(updatedItem);
    }
  } catch (error) {
    res.status(500).json({ error: 'Something Went Wrong' });
  }
};

// Delete cart item
const deleteCart = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedItem = await CartModel.findByIdAndDelete(
      { _id: productId },
      { user: req.user.id },
    );
    if (!deletedItem) {
      res.status(400).json({ message: 'Item does not exist' });
    } else {
      res
        .status(200)
        .json({ data: deletedItem, message: 'Item deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something Went Wrong' });
  }
};

const deleteAllCart = async (req, res) => {
  try {
    const deletedItem = await CartModel.deleteMany({ user: req.user.id });
    if (!deletedItem) {
      res.status(400).json({ message: 'Item does not exist' });
    } else {
      res.status(200).json({ data: [], message: 'Item deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCart, postCart, updateCart, deleteCart, deleteAllCart };
