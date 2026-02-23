import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Skema untuk User
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email harus unik
      match: [/\S+@\S+\.\S+/, 'Email is invalid'], // Validasi format email
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'vendor'],  // Role bisa user atau vendor
      default: 'user', // Default role adalah user
      required: true,
    },
    // Field tambahan untuk vendor, jika diperlukan
    services: [{ type: String }],  // Hanya untuk vendor
  },
  { timestamps: true }
);

// 🔒 Hash password sebelum save ke database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Hanya hash jika password baru atau diubah
  const salt = await bcrypt.genSalt(10);  // Menggunakan salt dengan tingkat keamanan 10
  this.password = await bcrypt.hash(this.password, salt);  // Hash password
  next();
});

// 🔍 Method untuk membandingkan password (untuk login)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);  // Bandingkan password yang dimasukkan dengan password yang ter-hash
};

const User = mongoose.model("User", userSchema);
export default User;
