import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // pastikan .env dibaca

// Log untuk memastikan env terbaca (tidak menampilkan secret)
console.log("Cloudinary Config Loaded:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "OK" : "MISSING",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
});

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("❌ ERROR: Cloudinary ENV variables missing!");
  throw new Error("Cloudinary ENV variables are not properly set");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
  api_key: process.env.CLOUDINARY_API_KEY.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET.trim(),
  secure: true,
});

export default cloudinary;
