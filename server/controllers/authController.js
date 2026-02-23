// controllers/authController.js
import User from "../models/user.js";
import Vendor from "../models/vendor.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let account = await User.findOne({ email });
    let role = "user";

    // jika tidak ketemu di user, cek vendor
    if (!account) {
      account = await Vendor.findOne({ email });
      role = "vendor";
    }

    if (!account)
      return res.status(404).json({ message: "Akun tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password salah" });

    const token = generateToken(account._id, role);

    res.json({
      success: true,
      message: "Login berhasil",
      token,
      role,
      user: {
        id: account._id,
        name: account.name,
        email: account.email,
        role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
