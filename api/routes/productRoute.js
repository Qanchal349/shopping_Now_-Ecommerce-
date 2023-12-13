const express = require("express");
const { getAllProducts, createNewProduct,updateProduct, deleteProduct, getSingleProduct } = require("../controllers/productContoller");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();


router.route("/products").get(getAllProducts)
router.route("/product").post(isAuthenticated,createNewProduct)
router.route("/product/:id").get(getSingleProduct).put(isAuthenticated,updateProduct).delete(isAuthenticated,deleteProduct)


module.exports = router ;
