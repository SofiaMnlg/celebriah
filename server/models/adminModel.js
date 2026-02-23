import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
