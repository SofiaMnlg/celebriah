import express from "express";
import {
  registerVendor,
  loginVendor,
  changeVendorPassword,
  getVendorProfile, // ⬅️ TAMBAH
} from "../controllers/vendorController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerVendor);
router.post("/login", loginVendor);

// 🔐 CHANGE PASSWORD
router.get("/me", protect, getVendorProfile);
router.put("/change-password", protect, changeVendorPassword);

export default router;
