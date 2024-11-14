const productRepository = require("../repository/productRepository");

//Create a new product
const createProduct = async (product) => {
  try {
    const newProduct = await productRepository.createProduct(product);
    return newProduct;
  } catch (err) {
    throw new Error(err);
  }
};

//Get all products
const getProducts = async () => {
  try {
    const products = await productRepository.getProducts();
    return products;
  } catch (err) {
    throw new Error(err);
  }
};

//Get product by id
const getProductById = async (id) => {
  try {
    const product = await productRepository.getProductById(id);
    return product;
  } catch (err) {
    throw new Error(err);
  }
};

//Update product by id
const updateProduct = async (id, product) => {
  try {
    const updatedProduct = await productRepository.updateProduct(id, product);
    return updatedProduct;
  } catch (err) {
    throw new Error(err);
  }
};

//Delete product by id
const deleteProduct = async (id) => {
  try {
    await productRepository.deleteProduct(id);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
