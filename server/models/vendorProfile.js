import mongoose from "mongoose";

const VendorProfileSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      unique: true,
    },

    storeName: {
      type: String,
      required: true,
    },

    description: String,

    location: String,

    category: {
      type: String,
      enum: ["Dekorasi", "MUA", "Musik", "Fotografi", "Makanan", "Aksesoris", "MC"],
    },

    calendarEnabled: {
      type: Boolean,
      default: false,
    },

    avatar: String,
  },
  { timestamps: true }
);

export default mongoose.model("VendorProfile", VendorProfileSchema);
