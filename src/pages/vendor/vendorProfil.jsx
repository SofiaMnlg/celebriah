import { useEffect, useState } from "react";
import api from "../../services/api";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

export default function VendorProfile() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔐 ambil data vendor dari token
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/vendors/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVendor(res.data);
      } catch (err) {
        setError("Gagal mengambil data vendor");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      return setError("Konfirmasi password tidak cocok");
    }

    try {
      const res = await api.put(
        "/vendors/change-password",
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message || "Password berhasil diubah");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengubah password");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="py-5" style={{ maxWidth: "600px" }}>
      {/* INFO VENDOR */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h4 className="fw-bold mb-2">Profil Vendor</h4>
          <p className="mb-1"><b>Nama:</b> {vendor?.name}</p>
          <p className="mb-1"><b>Email:</b> {vendor?.email}</p>
          <p className="mb-0 text-muted"><b>Role:</b> Vendor</p>
        </Card.Body>
      </Card>

      {/* CHANGE PASSWORD */}
      <Card className="shadow">
        <Card.Body>
          <h5 className="fw-bold mb-3">Ubah Password</h5>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Password Lama</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password Baru</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Konfirmasi Password Baru</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100">
              Simpan Perubahan
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
