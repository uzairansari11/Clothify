const { OrderModel } = require("../model/order_model");

// Get orders for a user
const getOrder = async (req, res) => {
  try {
    const orderData = await OrderModel.find({ user: req.user.id }).sort({
      date: -1,
      time: -1,
    });
    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

// Place a new order
const postOrder = async (req, res) => {
  const { items, name, email, address } = req.body;

  if (items.length === 0 || !name || !email || !address) {
    return res.status(400).json({ error: "Please provide all the details" });
  } else {
    try {
      // Calculate total price for each item
      const itemsWithTotalPrice = items.map(item => {
        const totalItemPrice = item.price * item.quantity;
        return { ...item, totalPrice: totalItemPrice };
      });

      // Calculate grand total
      const grandTotal = itemsWithTotalPrice.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

      // Create new order
      const orderDetail = await new OrderModel({
        items: itemsWithTotalPrice,
        name,
        email,
        address,
        user: req.user._id,
        date: new Date().toLocaleDateString("de-DE"),
        time: new Date().toLocaleTimeString(),
        grandTotal,
      });

      await orderDetail.save();
      res.status(200).json(orderDetail);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while posting the new order" });
    }
  }
};

// Update an order
const updateOrder = async (req, res) => { };

// Delete an order
const deleteOrder = async (req, res) => {

  
};

// Get orders grouped by user for admin
const getOrderByAdmin = async (req, res) => {
  try {
    const orderData = await OrderModel.aggregate([
      {
        $group: {
          _id: "$user",
          orders: { $push: "$$ROOT" }
        }
      }
    ]);
    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

module.exports = {
  getOrder,
  postOrder,
  updateOrder,
  deleteOrder,
  getOrderByAdmin,
};
