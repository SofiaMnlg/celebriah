import { useState } from "react";
import API from "../../api/axios";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

export default function ChangePassword() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setLoading(true);

      const res = await API.put(
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
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengubah password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "500px" }}>
      <Card className="shadow">
        <Card.Body>
          <h4 className="fw-bold mb-4 text-center">Ubah Password</h4>

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

            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Ubah Password"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
