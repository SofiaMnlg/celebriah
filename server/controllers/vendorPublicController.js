import Vendor from "../models/vendor.js";
import Product from "../models/Product.js";

/**
 * GET PUBLIC VENDOR PROFILE
 * GET /api/vendors/:id
 */
export const getVendorPublicProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // ambil data toko
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor tidak ditemukan" });
    }

    // ambil semua produk milik vendor
    const products = await Product.find({ vendor: id });

    res.json({
      vendor,
      products,
    });
  } catch (error) {
    console.error("Error get vendor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
