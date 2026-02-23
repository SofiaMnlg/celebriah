import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const categories = [
    "Dekorasi",
    "MUA",
    "Musik",
    "Fotografi",
    "Makanan",
    "Aksesoris",
    "MC",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda belum login sebagai vendor!");
      return;
    }

    if (!imageFile) {
      alert("Gambar belum dipilih!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("image", imageFile); // ini penting!

      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Produk berhasil ditambahkan!");
      console.log(response.data);

      // Reset form
      setForm({
        name: "",
        category: "",
        price: "",
        description: "",
      });
      setImageFile(null);

    } catch (err) {
      alert("Gagal menambahkan produk: " + err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Produk</h2>

      <input
        type="text"
        name="name"
        placeholder="Nama Produk"
        value={form.name}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">-- Pilih Kategori --</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="price"
        placeholder="Harga"
        value={form.price}
        onChange={handleChange}
        required
      />

      {/* FILE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />

      <textarea
        name="description"
        placeholder="Deskripsi"
        value={form.description}
        onChange={handleChange}
      ></textarea>

      <button type="submit">Tambah Produk</button>
    </form>
  );
};

export default AddProduct;
