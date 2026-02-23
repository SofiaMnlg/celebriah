import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin)
    return res.status(401).json({ message: "Admin tidak ditemukan" });

  const isMatch = await admin.matchPassword(password);
  if (!isMatch)
    return res.status(401).json({ message: "Password salah" });

  res.json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: "admin",
    token: generateToken(admin._id),
  });
};
