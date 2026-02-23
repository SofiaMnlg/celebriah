import mongoose from "mongoose";
import bcrypt from "bcryptjs";

if (mongoose.models.Vendor) {
  delete mongoose.models.Vendor;
}

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "vendor",
    },
  },
  { timestamps: true }
);

// HASH PASSWORD
vendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// MATCH PASSWORD
vendorSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Vendor", vendorSchema);
