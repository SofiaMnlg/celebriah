import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Button, Breadcrumb } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getProductById } from "../api/productApi";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // === FETCH PRODUK BERDASARKAN ID ===
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Gagal mengambil detail produk:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <Container className="py-5">
        <p className="text-muted">Memuat data produk...</p>
        <Link to="/" className="btn btn-outline-primary mt-3">Kembali ke Beranda</Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Beranda
        </Breadcrumb.Item>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: `/vendor/${product.category.toLowerCase()}` }}
        >
          {product.category}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="align-items-center">
        <Col md={6}>
          <Image
            src={product.image}
            alt={product.name}
            fluid
            rounded
            className="shadow-sm"
          />
        </Col>

        <Col md={6}>
          <h3 className="fw-bold text-primary mb-3">{product.name}</h3>

          <h4 className="fw-semibold text-dark mb-3">
            Rp {product.price.toLocaleString()}
          </h4>

          <p className="text-muted mb-4">{product.description}</p>

          <div className="d-flex gap-3">
            <Button variant="primary">Pesan Sekarang</Button>
            <Button variant="outline-secondary">Chat Vendor</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
