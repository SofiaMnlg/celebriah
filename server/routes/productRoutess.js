import express from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  getProductsByCategory,
  getVendorProducts,
  updateProduct,     // ⬅️ TAMBAHAN
  deleteProduct,     // ⬅️ TAMBAHAN
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { vendorOnly } from "../middleware/vendorOnly.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", getProducts);

router.post(
  "/",
  protect,
  vendorOnly,
  upload.single("image"),
  createProduct
);

router.get("/category/:category", getProductsByCategory);

router.get("/vendor/my-products", protect, vendorOnly, getVendorProducts);

router.get("/:id", getProductById);

// ✅ EDIT PRODUCT
router.put(
  "/:id",
  protect,
  vendorOnly,
  upload.single("image"),
  updateProduct
);

// ✅ DELETE PRODUCT
router.delete(
  "/:id",
  protect,
  vendorOnly,
  deleteProduct
);

export default router;
