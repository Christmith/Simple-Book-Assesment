const { db } = require("../config/firebase");

//Create a new product
const createProduct = async (product) => {
  try {
    const productRef = db.collection("products").doc();
    await productRef.set(product);
    return { id: productRef.id, ...product };
  } catch (err) {
    throw new Error(err);
  }
};

//Get all products
const getProducts = async () => {
  try {
    const snapshot = await db.collection("products").get();

    if (snapshot.empty) {
      console.log("No products found");
      throw new Error("No products found");
    }

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (err) {
    throw new Error(err);
  }
};

//Get product by id
const getProductById = async (id) => {
  try {
    const doc = await db.collection("products").doc(id).get();
    if (!doc.exists) {
      throw new Error("Product not found");
    }
    return { id: doc.id, ...doc.data() };
  } catch (err) {
    throw new Error(err);
  }
};

//Update product by id
const updateProduct = async (id, updatedProduct) => {
  try {
    const productRef = db.collection("products").doc(id);
    await productRef.update(updatedProduct);
    const doc = await productRef.get();
    return { id: doc.id, ...doc.data() };
  } catch (err) {
    throw new Error(err);
  }
};

//Delete product by id
const deleteProduct = async (id) => {
  try {
    const productRef = db.collection("products").doc(id);
    await productRef.delete();
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
