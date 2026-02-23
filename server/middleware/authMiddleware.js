import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Vendor from "../models/vendor.js";
import Admin from "../models/admin.js"; // ✅ FIX

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Tidak ada token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let account;
    if (decoded.role === "admin") {
      account = await Admin.findById(decoded.id).select("-password");
    } else if (decoded.role === "vendor") {
      account = await Vendor.findById(decoded.id).select("-password");
    } else {
      account = await User.findById(decoded.id).select("-password");
    }

    if (!account) {
      return res.status(404).json({ message: "Akun tidak ditemukan" });
    }

    req.user = account;
    req.user.role = decoded.role;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};
