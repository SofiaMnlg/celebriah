import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { Form, Button, Container, Card } from "react-bootstrap";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ambil data produk lama
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await API.get(`/products/${id}`);
        setForm({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
          category: res.data.category,
        });
      } catch (err) {
        alert("Gagal memuat produk");
      }
    }

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      if (image) formData.append("image", image);

      await API.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Produk berhasil diperbarui");
      navigate("/vendor/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Update gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow p-4">
        <h3 className="mb-3">✏️ Edit Produk</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Produk</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Harga</Form.Label>
            <Form.Control
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kategori</Form.Label>
            <Form.Control
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Ganti Gambar (opsional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
