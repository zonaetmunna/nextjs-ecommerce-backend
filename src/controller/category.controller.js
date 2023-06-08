const {
  getCategoriesService,
  createCategoryService,
  updateCategoryByIdService,
  deleteCategoryService,
} = require("../services/category.service");
const responseGenerate = require("../utils/responseGenerate ");

exports.getCategories = async (req, res, next) => {
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

    const categories = await getCategoriesService(filters, queries);

    res
      .status(200)
      .json(
        responseGenerate(categories, "Category gated successfully!", false)
      );
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    res
      .status(200)
      .json(responseGenerate(result, "Category added successfully!", false));
  } catch (error) {
    next(error);
  }
};

//update category by ID
exports.updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await updateCategoryByIdService(id, data);

    res
      .status(200)
      .json(responseGenerate(result, "Category updated successfully!", false));
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteCategoryService(id);
    res
      .status(200)
      .json(responseGenerate(result, "Category deleted successfully!", false));
  } catch (error) {
    next(error);
  }
};
