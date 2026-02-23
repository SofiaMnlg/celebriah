import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/adminModel.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const adminExist = await Admin.findOne({ email: "admin@celebriah.com" });

if (adminExist) {
  console.log("Admin sudah ada");
  process.exit();
}

await Admin.create({
  name: "Super Admin",
  email: "admin@celebriah.com",
  password: "Admin123!", // ganti setelah login
});

console.log("Admin berhasil dibuat");
process.exit();
