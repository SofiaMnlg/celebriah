export const vendorOnly = (req, res, next) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({ message: "Akses vendor saja" });
  }
  next();
};
