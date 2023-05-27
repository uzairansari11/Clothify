const { ProductModel } = require("../model/product_model");

const getProduct = async (req, res) => {
	try {
		const allProduct = await ProductModel.find().limit(2).sort({ price: 1 });
		res.status(200).json(allProduct);
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while posting the  new  product" });
	}
};

const postProduct = async (req, res) => {
	const {
		ProductName,
		productCategory,
		productType,
		brand,
		price,
		discount,
		pic,
		description,
		expiry,
		rating,
		lifeStage,
		weight,
	} = req.body;

	if (
		!ProductName ||
		!productCategory ||
		!productType ||
		!brand ||
		!price ||
		discount === undefined ||
		pic.length == 0 ||
		!description ||
		!expiry ||
		rating === undefined ||
		!lifeStage ||
		!weight
	) {
		return res.status(400).json({ error: "Please provide all the details" });
	}

	try {
		let productDetails = await new ProductModel(req.body);
		productDetails.save();
		res.status(200).json(productDetails);
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while posting the  new  product" });
	}
};
const updateProduct = async (req, res) => {
	const { id } = req.params;
	const payload = req.body;
	try {
		const updatedProduct = await ProductModel.findByIdAndUpdate(
			{ _id: id },
			payload,
			{
				new: true,
			},
		);
		if (!updatedProduct) {
			res.status(404).json({ error: "Product not found" });
		} else {
			res.status(200).json(updatedProduct);
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while updating the   product" });
	}
};

const deleteProduct = async (req, res) => {
	const { id } = req.params;
	const payload = req.body;
	try {
		const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id });
		if (!deletedProduct) {
			res.status(404).json({ error: "Product not found" });
		} else {
			res.status(200).json({ message: "Product deleted successfully" });
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while deleting the   product" });
	}
};

module.exports = { getProduct, postProduct, updateProduct, deleteProduct };
