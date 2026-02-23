import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutess.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import vendorPublicRoutes from "./routes/vendorPublicRoutes.js";



dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendors", vendorPublicRoutes);


// Connect ke MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`✅ MongoDB Connected`))
  .catch((err) => console.log(`❌ Error: ${err.message}`));

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
