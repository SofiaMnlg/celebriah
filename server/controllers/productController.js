import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";


// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);      // Debug
    console.log("REQ FILE:", req.file);      // Debug

    const { name, category, price, description } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: "Data produk tidak lengkap!" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Gambar produk wajib diunggah!" });
    }

    // URL Cloudinary (hasil upload multer-storage-cloudinary)
    const imageUrl = req.file.path;

    const product = await Product.create({
      vendor: req.user._id,
      name,
      category,
      price,
      description,
      image: imageUrl,
    });

    res.status(201).json(product);

  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("vendor", "name"); // ⬅️ WAJIB

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json(product); // <-- HARUS LANGSUNG OBJECT
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const products = await Product.find({
      category: { $regex: `^${category}$`, $options: "i" },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PRODUCTS BY LOGGED-IN VENDOR
export const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    // pastikan vendor pemilik
    if (product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    const { name, price, description, category } = req.body;

    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      product.image = uploadRes.secure_url;
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    // pastikan vendor pemilik produk
    if (product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    // hapus gambar di cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await product.deleteOne();

    res.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};