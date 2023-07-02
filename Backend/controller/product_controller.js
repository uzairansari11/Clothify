const { ProductModel } = require('../model/product_model');

// Get products based on filters, search, pagination, and sorting
const getProduct = async (req, res) => {
  try {
    const { query } = req;

    const filter = {};
    const sort = {};

    // Build the filter and sort objects dynamically based on query parameters
    for (const key in query) {
      if (['page', 'limit', 'sortField', 'sortOrder', 'search'].includes(key)) {
        continue;
      }

      if (query[key].includes('lte')) {
        const value = query[key].replace('lte', '');
        filter[key] = { $lte: value };
      } else if (query[key].includes('gte')) {
        const value = query[key].replace('gte', '');
        filter[key] = { $gte: value };
      } else if (query[key].includes('lt')) {
        const value = query[key].replace('lt', '');
        filter[key] = { $lt: value };
      } else {
        filter[key] = query[key];
      }
    }

    // Add search functionality
    if (query.search) {
      const searchQuery = new RegExp(query.search, 'i');
      filter.title = searchQuery;
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const sortField = query.sortField || 'price';
    const sortOrder = query.sortOrder || 'asc';
    sort[sortField] = sortOrder === 'desc' ? -1 : 1;

    const [data, totalCount] = await Promise.all([
      ProductModel.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      ProductModel.countDocuments(filter),
    ]);

    res.status(200).json({
      data,
      totalCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product by ID
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const singleProduct = await ProductModel.findOne({ _id: id });
    if (!singleProduct) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(singleProduct);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while getting the product' });
  }
};

// Create a new product
const postProduct = async (req, res) => {
  const {
    title,
    category,
    subcategory,
    brand,
    price,
    discount,
    images,
    description,
    rating,
    total_rating,
    sizes,
    quantity,
  } = req.body;

  if (
    !title ||
    !category ||
    !subcategory ||
    !brand ||
    !price ||
    discount === undefined ||
    images.length === 0 ||
    !description ||
    rating === undefined ||
    !total_rating ||
    !sizes ||
    !quantity
  ) {
    return res.status(400).json({ error: 'Please provide all the details' });
  }

  try {
    const productDetails = await new ProductModel(req.body).save();
    res.status(200).json(productDetails);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while posting the new product' });
  }
};

// Update a product
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
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating the product' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id });
    if (!deletedProduct) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(deletedProduct);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the product' });
  }
};

module.exports = {
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};
