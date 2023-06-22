const Brand = require("../models/brad.model");
const {
  getBrandService,
  createBrandService,
  updateBrandByIdService,
  deleteBrandService,
} = require("../services/brand.service");

const responseGenerate = require("../utils/responseGenerate ");

exports.getBrands = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    //sort , page , limit -> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt ,lt ,gte .lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const brands = await getBrandService(filters, queries);

    res
      .status(200)
      .json(responseGenerate(brands, "Brands gated successfully!", false));
  } catch (error) {
    next(error);
  }
};

exports.createBrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    // Check if brand with the same name already exists
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      const error = new Error("Brand with the same name already exists");
      error.statusCode = 409; // Conflict
      throw error;
    }
    const result = await createBrandService(req.body);
    res
      .status(200)
      .json(responseGenerate(result, "Brand added successfully!", false));
  } catch (error) {
    next(error);
  }
};

//update category by ID
exports.updateBrands = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await updateBrandByIdService(id, data);

    res
      .status(200)
      .json(responseGenerate(result, "brand updated successfully!", false));
  } catch (error) {
    next(error);
  }
};

exports.deleteBrands = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteBrandService(id);
    res
      .status(200)
      .json(responseGenerate(result, "brand deleted successfully!", false));
  } catch (error) {
    next(error);
  }
};
