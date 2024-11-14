import axios from "axios";
import { auth } from "../firebase";

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}/api`;

//Create a new product
const createProduct = async (product) => {
  try {
    const token = await auth.currentUser.getIdToken();
    const response = await axios.post(`${BASE_URL}/products/`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Get all products
const getProducts = async () => {
  try {
    const token = await auth.currentUser.getIdToken();
    const response = await axios.get(`${BASE_URL}/products/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Get product by id
const getProductById = async (id) => {
  try {
    const token = await auth.currentUser.getIdToken();
    const response = await axios.get(`${BASE_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Update product by id
const updateProduct = async (id, product) => {
  try {
    const token = await auth.currentUser.getIdToken();
    const response = await axios.put(`${BASE_URL}/products/${id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Delete product by id
const deleteProduct = async (id) => {
  try {
    const token = await auth.currentUser.getIdToken();
    const response = await axios.delete(`${BASE_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
