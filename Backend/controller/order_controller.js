const { OrderModel } = require('../model/order_model');
const { sendSuccess, sendError } = require('../utils/response');

const getOrder = async (req, res) => {
  try {
    const orderData = await OrderModel.find({ user: req.user.id }).sort({ date: -1, time: -1 });
    return sendSuccess(res, orderData, 'Orders fetched successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while fetching orders');
  }
};

const postOrder = async (req, res) => {
  const { items, name, email, address } = req.body;

  if (!items?.length || !name || !email || !address) {
    return sendError(res, 'Please provide all the details', 400);
  }

  try {
    const itemsWithTotalPrice = items.map((item) => ({
      ...item,
      totalPrice: item.price * item.quantity,
    }));

    const grandTotal = itemsWithTotalPrice.reduce((acc, item) => acc + item.totalPrice, 0);

    const order = new OrderModel({
      items: itemsWithTotalPrice,
      name, email, address,
      user: req.user._id,
      date: new Date().toLocaleDateString('de-DE'),
      time: new Date().toLocaleTimeString(),
      grandTotal,
    });

    await order.save();
    return sendSuccess(res, order, 'Order placed successfully', 201);
  } catch (error) {
    return sendError(res, 'An error occurred while placing the order');
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return sendError(res, 'Order not found', 404);
    }
    return sendSuccess(res, order, 'Order updated successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while updating the order');
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return sendError(res, 'Order not found', 404);
    }
    return sendSuccess(res, order, 'Order deleted successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while deleting the order');
  }
};

const getOrderByAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Math.min(100, Number(limit)));

    const filter = {};
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ name: regex }, { email: regex }];
    }

    const [orders, totalCount] = await Promise.all([
      OrderModel.find(filter)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .sort({ createdAt: -1 }),
      OrderModel.countDocuments(filter),
    ]);

    return sendSuccess(res, { orders, totalCount, page: pageNum, limit: limitNum }, 'Orders fetched successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while fetching admin orders');
  }
};

module.exports = { getOrder, postOrder, updateOrder, deleteOrder, getOrderByAdmin };
