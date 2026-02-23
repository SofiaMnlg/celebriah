import express from "express";
import { getVendorPublicProfile } from "../controllers/vendorPublicController.js";

const router = express.Router();

// PUBLIC - lihat profil toko + produknya
// GET /api/vendors/:id
router.get("/:id", getVendorPublicProfile);

export default router;
