const { CartModel } = require("../model/cart_model");

const getCart = async (req, res) => {
	console.log(req.user.id)
	try {
		const cartData = await CartModel.find({ user: req.user.id });
		res.status(200).json(cartData);
	} catch (error) {
		res.status(500).json({ error: "Soemting Went Wrong" });
	}
};

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
		size
	} = req.body;

	if (
		!title ||
		!category ||
		!subcategory ||
		!brand ||
		!price ||
		discount == undefined ||
		quantity == undefined ||
		images.length == 0 ||
		!size
	) {
		return res.status(400).json({ error: "Please provide all the details" });
	} else {
		try {
			let cartDetails = await new CartModel({
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
			});

			await cartDetails.save();
			res.status(200).json(cartDetails);
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ error: "An error occurred while posting the  new  product" });
		}
	}
};

const updateCart = async (req, res) => {
	const payload = req.body;
	const productId = req.params.id;
	try {
		const updatedItem = await CartModel.findByIdAndUpdate(
			{ _id: productId, user: req.user.id },
			payload,
			{
				new: true,
			},
		);
		if (!updatedItem) {
			res.status(400).json({ message: "Item does not exists" });
		} else {
			res.status(200).json(updatedItem);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Soemting Went Wrong" });
	}
};

const deleteCart = async (req, res) => {
	const productId = req.params.id;
	try {
		const deletedItem = await CartModel.findByIdAndDelete(
			{ _id: productId },
			{ user: req.user.id },
		);
		if (!deletedItem) {
			res.status(400).json({ message: "Item does not exists" });
		} else {
			res.status(200).json({ data: deletedItem, message: "Item deleted successfully" });
		}
	} catch (error) {
		res.status(500).json({ error: "Soemting Went Wrong" });
	}
};

module.exports = { getCart, postCart, updateCart, deleteCart };
