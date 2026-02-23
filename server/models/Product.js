import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String, // siap untuk multi foto
      },
    ],

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
