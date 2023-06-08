const Product = require("../models/product.model");

exports.getProductsService = async (queries, filters) => {
  const products = await Product.find(queries)
    .skip(filters.skip)
    .limit(filters.limit)
    .select(filters.fields)
    .sort(filters.sortBy);

  const count = await Product.countDocuments(queries);

  const totalPage = Math.ceil(count / filters.limit);
  return { products, count, totalPage };
};

exports.createProductService = async (data) => {
  const product = await Product.create({ ...data });

  return product;
};

exports.getProductByIdService = async (id) => {
  const product = await Product.findById(id);
  return product;
};

exports.updateProductByIdService = async (id) => {
  const product = await Product.findByIdAndUpdate(id);
  return product;
};
