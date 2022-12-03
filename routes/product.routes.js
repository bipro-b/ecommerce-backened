const express = require("express");

const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/product.controller");

const router = express.Router();

router.route("/").post(createProduct).get(getProduct);

router
  .route("/:id")
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
