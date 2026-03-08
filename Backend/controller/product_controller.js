const { ProductModel } = require('../model/product_model');
const { sendSuccess, sendError } = require('../utils/response');

const getProduct = async (req, res) => {
  try {
    const { query } = req;
    const filter = {};
    const sort = {};

    for (const key in query) {
      if (['page', 'limit', 'sortField', 'sortOrder', 'search'].includes(key)) continue;

      if (query[key].includes('lte')) {
        filter[key] = { $lte: query[key].replace('lte', '') };
      } else if (query[key].includes('gte')) {
        filter[key] = { $gte: query[key].replace('gte', '') };
      } else if (query[key].includes('lt')) {
        filter[key] = { $lt: query[key].replace('lt', '') };
      } else {
        filter[key] = query[key];
      }
    }

    if (query.search && query.search.trim()) {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [
        { title: searchRegex },
        { brand: searchRegex },
        { description: searchRegex },
      ];
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

    return sendSuccess(res, { products: data, totalCount, page, limit }, 'Products fetched successfully');
  } catch (error) {
    return sendError(res, error.message);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return sendError(res, 'Product not found', 404);
    }
    return sendSuccess(res, product, 'Product fetched successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while getting the product');
  }
};

const postProduct = async (req, res) => {
  const { title, category, subcategory, brand, price, discount, images, description, rating, total_rating, sizes, quantity } = req.body;

  if (!title || !category || !subcategory || !brand || !price || discount === undefined || !images?.length || !description || rating === undefined || !total_rating || !sizes || !quantity) {
    return sendError(res, 'Please provide all the details', 400);
  }

  try {
    const product = await new ProductModel(req.body).save();
    return sendSuccess(res, product, 'Product created successfully', 201);
  } catch (error) {
    return sendError(res, 'An error occurred while creating the product');
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return sendError(res, 'Product not found', 404);
    }
    return sendSuccess(res, product, 'Product updated successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while updating the product');
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return sendError(res, 'Product not found', 404);
    }
    return sendSuccess(res, product, 'Product deleted successfully');
  } catch (error) {
    return sendError(res, 'An error occurred while deleting the product');
  }
};

const getFilters = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const [subcategories, brands] = await Promise.all([
      ProductModel.distinct('subcategory', filter),
      ProductModel.distinct('brand', filter),
    ]);

    return sendSuccess(
      res,
      { subcategories: subcategories.sort(), brands: brands.sort() },
      'Filters fetched successfully'
    );
  } catch (error) {
    return sendError(res, 'An error occurred while fetching filters');
  }
};

module.exports = { getProduct, postProduct, updateProduct, deleteProduct, getSingleProduct, getFilters };
