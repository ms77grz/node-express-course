const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    name: { $regex: 'aB', $options: 'i' },
  });
  if (!products.length) {
    throw new Error('No products here.');
  }
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
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
  const products = await Product.find(query);
  if (!products.length) {
    throw new Error('No products here.');
  }
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
