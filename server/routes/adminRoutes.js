import express from "express";
import {
  loginAdmin,
  getAllUsers,
  getAllVendors,
  exportUsersCSV,
  exportVendorsCSV,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

// login
router.post("/login", loginAdmin);

// protected admin
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/vendors", protect, adminOnly, getAllVendors);

// EXPORT CSV
router.get("/export/users", protect, adminOnly, exportUsersCSV);
router.get("/export/vendors", protect, adminOnly, exportVendorsCSV);

export default router;
