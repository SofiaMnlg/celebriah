import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  // 🔹 ambil produk vendor
  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const res = await API.get("/products/vendor/my-products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(res.data);
      } catch (err) {
        console.error(
          "Gagal memuat produk vendor:",
          err.response?.data?.message || err.message
        );
      }
    };

    fetchMyProducts();
  }, [token]);

  // 🔥 hapus produk
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus produk ini?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // update state tanpa reload
      setProducts(products.filter((p) => p._id !== id));

      alert("Produk berhasil dihapus");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus produk");
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Produk Saya</h3>
        <Link to="/vendor/add-product">
          <Button variant="primary">Tambah Produk</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p>Belum ada produk. Mulai tambahkan sekarang!</p>
      ) : (
        <Row md={3} className="g-3">
          {products.map((p) => (
            <Col key={p._id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  src={p.image}
                  alt={p.name}
                  style={{ height: "150px", objectFit: "cover" }}
                />

                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>
                    Rp {Number(p.price).toLocaleString("id-ID")}
                  </Card.Text>

                  <div className="d-flex gap-2">
                    <Button
                      as={Link}
                      to={`/vendor/edit-product/${p._id}`}
                      variant="primary"
                      size="sm"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(p._id)}
                    >
                      Hapus
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
