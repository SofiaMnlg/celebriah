import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

export const protectAdmin = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Token admin tidak ada" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Bukan admin" });
    }

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Admin tidak valid" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token admin tidak valid" });
  }
};
