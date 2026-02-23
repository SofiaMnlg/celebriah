import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama wajib diisi"],
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email tidak valid"],
    },
    password: {
      type: String,
      required: [true, "Password wajib diisi"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user"], // user tidak bisa menjadi vendor
    },
  },
  { timestamps: true }
);

// Hash password sebelum save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method untuk cek password saat login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Fix OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
