const productController = require("../controller/productController");
const verifyIdToken = require("../auth");
const router = require("express").Router();

//Create a new product
router.post("/", verifyIdToken, productController.createProduct);

//Get all products
router.get("/", verifyIdToken, productController.getProducts);

//Get product by id
router.get("/:id", verifyIdToken, productController.getProductById);

//Update product by id
router.put("/:id", verifyIdToken, productController.updateProduct);

//Delete product by id
router.delete("/:id", verifyIdToken, productController.deleteProduct);

module.exports = router;
