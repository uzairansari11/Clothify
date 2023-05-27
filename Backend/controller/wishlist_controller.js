const { WishlistModel } = require("../model/wishlist_model");


const getWishlist = async (req, res) => {
	try {
		const wishData = await WishlistModel.find({ user: req.user.id });
		res.status(200).json(wishData);
	} catch (error) {
		res.status(500).json({ error: "Soemting Went Wrong" });
	}
};

const postWishlist = async (req, res) => {
	const {
		productName,
		productCategory,
		productType,
		brand,
		price,
		discount,
		quantity,
		pic,
	} = req.body;

	if (
		!productName ||
		!productCategory ||
		!productType ||
		!brand ||
		!price ||
		discount == undefined ||
		quantity == undefined ||
		pic.length == 0
	) {
		return res.status(400).json({ error: "Please provide all the details" });
	} else {
		try {
			let wishlistDetails = await new WishlistModel({
				productName,
				productCategory,
				productType,
				brand,
				price,
				discount,
				quantity,
				pic,
				user: req.user._id, 
			});

			await wishlistDetails.save();
			res.status(200).json(wishlistDetails);
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ error: "An error occurred while posting the  new  product" });
		}
	}
};

const updateWishlist = async (req, res) => {
	const payload = req.body;
	const productId = req.params.id;
	try {
		const updatedItem = await WishlistModel.findByIdAndUpdate(
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

const deleteWishlist = async (req, res) => {
	const productId = req.params.id;
	try {
		const deletedItem = await WishlistModel.findByIdAndDelete(
			{ _id: productId },
			{ user: req.user.id },
		);
		if (!deletedItem) {
			res.status(400).json({ message: "Item does not exists" });
		} else {
			res.status(200).json({ message: "Item deleted successfully" });
		}
	} catch (error) {
		res.status(500).json({ error: "Soemting Went Wrong" });
	}
};

module.exports = { getWishlist, postWishlist, updateWishlist, deleteWishlist };