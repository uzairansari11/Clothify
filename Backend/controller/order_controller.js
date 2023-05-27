const { OrderModel } = require("../model/order_model");

const getOrder = async (req, res) => {
	try {
		const orderData = await OrderModel.find({ user: req.user.id });
		res.status(200).json(orderData);
	} catch (error) {
		res.status(500).json({ error: "Soemting Went Wrong" });
	}
};

const postOrder = async (req, res) => {
	const {
		productName,
		productCategory,
		productType,
		brand,
		price,
		quantity,
		pic,
	} = req.body;

	if (
		!productName ||
		!productCategory ||
		!productType ||
		!brand ||
		!price ||
		quantity == undefined ||
		pic.length == 0
	) {
		return res.status(400).json({ error: "Please provide all the details" });
	} else {
		try {
			let orderDetail = await new OrderModel({
				productName,
				productCategory,
				productType,
				brand,
				price,
				quantity,
				pic,
				user: req.user._id,
				date: new Date().toLocaleDateString("de-DE"),
			});

			await orderDetail.save();
			res.status(200).json(orderDetail);
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ error: "An error occurred while posting the  new  product" });
		}
	}
};

const updateOrder = async (req, res) => {};

const deleteOrder = async (req, res) => {};

module.exports = { getOrder, postOrder, updateOrder, deleteOrder };
