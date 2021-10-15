const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort('name')
    .select('name price')
    .limit(4)
    .skip(1);
  if (!products.length) {
    throw new Error('No products here.');
  }
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  // filter
  const query = {};
  if (featured) {
    query.featured = featured === 'true' ? true : false;
  }
  if (company) {
    query.company = company;
  }
  if (name) {
    query.name = { $regex: name, $options: 'i' };
  }
  let result = Product.find(query);
  // sort
  if (sort) {
    const sortList = sort.replace(/,/g, ' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }
  // select certain fields
  if (fields) {
    const fieldsList = fields.replace(/,/g, ' ');
    result = result.select(fieldsList);
  }
  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const products = await result;
  if (!products.length) {
    throw new Error('No products here.');
  }
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
