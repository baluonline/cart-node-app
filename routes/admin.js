const express = require("express");

const adminController = require("../controllers/admin");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
// it can reached with admin/adminproduct
//admin/add-product
router.get("/add-product",isAuth,  adminController.getAddProducts);

router.post("/add-product", adminController.postAddProduct);

//admin/products
router.get("/products", isAuth, adminController.getProducts);

router.post("/edit-product", adminController.postEditProducts);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
