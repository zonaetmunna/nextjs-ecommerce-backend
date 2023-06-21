const Product = require("../models/product.model");
const {
  getProductsService,
  createProductService,
  getProductByIdService,
  updateProductByIdService,
} = require("../services/product.service");
const responseGenerate = require("../utils/responseGenerate ");

exports.getProducts = async (req, res, next) => {
  try {
    let queries = { ...req.query };
    console.log(queries);
    //sort , page , limit, category, price, rating, brand, color, size -> exclude
    const excludeFields = [
      "search",
      "sort",
      "page",
      "limit",
      "category",
      "price",
      "rating",
      "brand",
      "color",
      "size",
    ];
    excludeFields.forEach((field) => delete queries[field]);

    //gt ,lt ,gte .lte
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    queries = JSON.parse(queryString);

    const filters = {
      limit: 10,
    };

    if (req.query.search) {
      const searchText = req.query.search;
      queries.name = { $regex: searchText, $options: "i" };
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      filters.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      filters.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page, limit } = req.query;
      const skip = (page - 1) * parseInt(limit);
      filters.skip = skip;
      filters.limit = parseInt(limit);
    }

    const products = await getProductsService(queries, filters);

    res
      .status(200)
      .json(responseGenerate(products, "Product gated successfully!", false));
  } catch (error) {
    next(error);
  }
};

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;

    const products = await Product.find({ category: category });

    res
      .status(200)
      .json(
        responseGenerate(
          products,
          "Products fetched successfully by category!",
          false
        )
      );
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await createProductService(req.body);

    res
      .status(200)
      .json(responseGenerate(newProduct, "Product added successfully!", false));
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await getProductByIdService(id);

    res
      .status(200)
      .json(responseGenerate(product, "Product get successfully!", false));
  } catch (error) {
    next(error);
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const query = req.params.id;
    const product = await updateProductByIdService(id);

    res
      .status(200)
      .json(responseGenerate(product, "Product update successfully!", false));
  } catch (error) {
    next(error);
  }
};
