import Order from "../models/orderModel.js";
import Product from "../models/Product.js";

// 📦 Buat pesanan (hanya user login)
export const createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Cek apakah produk ada
    const product = await Product.findById(productId).populate("vendor", "_id name");
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    const totalPrice = product.price * (quantity || 1);

    const newOrder = new Order({
      user: req.user._id, // Ambil user ID dari middleware protect
      product: product._id,
      vendor: product.vendor._id,
      quantity,
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧾 Pembeli lihat pesanan miliknya
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("product", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🏪 Vendor lihat pesanan produk miliknya
export const getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.user._id }) // Filter pesanan berdasarkan vendor
      .populate("product", "name price")
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
