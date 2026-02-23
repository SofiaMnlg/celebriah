import Admin from "../models/admin.js";
import User from "../models/user.js";
import Vendor from "../models/vendor.js";
import jwt from "jsonwebtoken";
import { Parser } from "json2csv";

// generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Admin tidak ditemukan" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
      token: generateToken(admin._id, "admin"),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// GET ALL VENDORS
export const getAllVendors = async (req, res) => {
  const vendors = await Vendor.find().select("-password");
  res.json(vendors);
};

/* ===========================
   EXPORT USERS CSV
=========================== */
export const exportUsersCSV = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const fields = ["_id", "name", "email", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(users);

    res.header("Content-Type", "text/csv");
    res.attachment("users.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===========================
   EXPORT VENDORS CSV
=========================== */
export const exportVendorsCSV = async (req, res) => {
  try {
    const vendors = await Vendor.find().select("-password");

    const fields = ["_id", "name", "email", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(vendors);

    res.header("Content-Type", "text/csv");
    res.attachment("vendors.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};