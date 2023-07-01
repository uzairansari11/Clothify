const { OrderModel } = require("../model/order_model");

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

const postOrder = async (req, res) => {
  const { items, name, email, address } = req.body;

  if (items.length === 0 || !name || !email || !address) {
    return res.status(400).json({ error: "Please provide all the details" });
  } else {
    try {
      const itemsWithTotalPrice = items.reduce((acc, item) => {
        const totalItemPrice = item.price * item.quantity;
        item.totalPrice = totalItemPrice;
        acc.push(item);
        return acc;
      }, []);

      const grandTotal = itemsWithTotalPrice.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

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
        .json({ error: "An error occurred while posting the new product" });
    }
  }
};

const updateOrder = async (req, res) => { };

const deleteOrder = async (req, res) => { };

const getOrderByAdmin = async (req, res) => {
  try {
    const orderData = await OrderModel.find();
    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json({ error: "Soemting Went Wrong" });
  }
};
module.exports = {
  getOrder,
  postOrder,
  updateOrder,
  deleteOrder,
  getOrderByAdmin,
};
