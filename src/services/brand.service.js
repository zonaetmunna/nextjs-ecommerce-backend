const Brand = require("../models/brad.model");
const Category = require("../models/category.model");

exports.getBrandService = async (filters, queries) => {
  const brand = await Brand.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const count = await Brand.countDocuments(filters);
  const totalPage = Math.ceil(count / queries.limit);

  return { count, totalPage, brand };
};

exports.createBrandService = async (data) => {
  const brand = await Brand.create(data);
  return brand;
};

exports.updateBrandByIdService = async (id, data) => {
  const result = await Brand.findByIdAndUpdate(id, data);
  console.log(result);
  return result;
};

exports.deleteBrandService = async (id) => {
  const brand = await Brand.deleteOne({ _id: id });
  return brand;
};
