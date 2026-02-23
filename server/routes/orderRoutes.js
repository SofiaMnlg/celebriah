import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { vendorOnly } from "../middleware/vendorOnly.js";  // Middleware baru untuk vendor
import { createOrder, getUserOrders, getVendorOrders } from "../controllers/orderController.js";

const router = express.Router();

// User membuat pesanan
router.post("/", protect, createOrder);

// User melihat pesanan mereka
router.get("/", protect, getUserOrders);

// Vendor melihat pesanan untuk produk mereka
router.get("/vendor", protect, vendorOnly, getVendorOrders);

export default router;
