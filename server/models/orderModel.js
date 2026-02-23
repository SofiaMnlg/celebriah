import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // pembeli
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // vendor pemilik produk
    quantity: { type: Number, required: true, default: 1 },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// 🔥 Tambahkan pengecekan supaya tidak "overwrite" model jika sudah ada
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
