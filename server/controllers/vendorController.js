import Vendor from "../models/vendor.js";
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// REGISTER VENDOR
export const registerVendor = async (req, res) => {
  try {
    const { name, email, password, storeName } = req.body;

    const exist = await Vendor.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // 1️⃣ Buat akun vendor
    const vendor = await Vendor.create({
      name,
      email,
      password,
    });

    // 2️⃣ Buat profil toko
    await VendorProfile.create({
      vendor: vendor._id,
      storeName,
    });

    res.status(201).json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      role: vendor.role,
      token: generateToken(vendor._id, vendor.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN VENDOR
export const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(401).json({ message: "Vendor tidak ditemukan" });
    }

    const isMatch = await vendor.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    res.json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      role: vendor.role,
      token: generateToken(vendor._id, vendor.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changeVendorPassword = async (req, res) => {
  try {
    const vendorId = req.user._id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor tidak ditemukan" });
    }

    const isMatch = await vendor.matchPassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Password lama salah" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password minimal 6 karakter" });
    }

    // 🔥 AUTO HASH (karena pre-save middleware)
    vendor.password = newPassword;
    await vendor.save();

    res.json({ message: "Password berhasil diubah" });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengubah password" });
  }
};

export const getVendorProfile = async (req, res) => {
  try {
    // req.user di-set dari authMiddleware
    const vendor = await Vendor.findById(req.user._id).select("-password");

    if (!vendor) {
      return res.status(404).json({ message: "Vendor tidak ditemukan" });
    }

    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data vendor" });
  }
};