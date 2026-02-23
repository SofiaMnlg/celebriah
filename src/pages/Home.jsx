import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import API from "../api/axios";

export default function HomePage() {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  const categories = [
    "Dekorasi",
    "MUA",
    "Musik",
    "Fotografi",
    "Makanan",
    "Aksesoris",
    "MC",
  ];

  /* ================= PROMO DATA ================= */
  const promoHariBesar = [
    {
      img: "https://images.unsplash.com/photo-1589810264340-ea5d8c7a1a34?w=1400",
      title: "Promo Akhir Tahun!",
      caption: "Diskon hingga 40% untuk semua jasa vendor.",
    },
    {
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400",
      title: "Promo Hari Raya!",
      caption: "Rayakan momen spesial dengan promo eksklusif.",
    },
  ];

  const promoKolab = [
    {
      img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200",
      title: "Kolaborasi MUA + Fotografi",
    },
    {
      img: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=1200",
      title: "Dekorasi + Musik Wedding Pack",
    },
  ];

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await API.get("/products");

        // inisialisasi kategori
        const grouped = {};
        categories.forEach((c) => (grouped[c] = []));

        // normalisasi kategori (CASE SAFE)
        res.data.forEach((p) => {
          const match = categories.find(
            (c) => c.toLowerCase() === p.category.toLowerCase()
          );

          if (match) {
            grouped[match].push(p);
          }
        });

        setProductsByCategory(grouped);
      } catch (err) {
        console.error("Gagal memuat produk:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <p>Memuat produk...</p>
      </Container>
    );
  }

  return (
    <>
      {/* ================= BANNER PROMO ================= */}
      <Carousel fade interval={4000}>
        {promoHariBesar.map((p, i) => (
          <Carousel.Item key={i}>
            <img
              src={p.img}
              alt={p.title}
              style={{ width: "100%", height: "380px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3 className="fw-bold bg-dark bg-opacity-50 px-2 rounded">
                {p.title}
              </h3>
              <p className="bg-dark bg-opacity-50 rounded">{p.caption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="mt-4">
        {/* ================= KATEGORI ================= */}
        <Card className="shadow-sm p-4 mb-5">
          <h4 className="fw-bold mb-3 text-primary">
            Kategori & Produk Unggulan 🌟
          </h4>

          <Row className="mb-4" xs={3} md={4} lg={7}>
            {categories.map((cat) => (
              <Col key={cat} className="mb-3 text-center">
                <Link
                  to={`/vendor/${cat.toLowerCase()}`}
                  className="text-decoration-none"
                >
                  <div className="border rounded p-2 shadow-sm">
                    <strong className="text-dark">{cat}</strong>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>

          {/* ================= PRODUK UNGGULAN ================= */}
          <Row xs={2} md={4} className="g-3">
            {categories.map((cat) =>
              productsByCategory[cat]?.slice(0, 1).map((p) => (
                <Col key={p._id}>
                  <Card className="shadow-sm border-0 h-100">
                    <Card.Img
                      src={p.image}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title className="small fw-bold">
                        {p.name}
                      </Card.Title>
                       {/* NAMA VENDOR */}
                      
                      <div className="small mb-1">
                      👤{" "}
                      {p.vendor ? (
                        <Link
                          to={`/vendor/store/${p.vendor._id}`}
                          className="text-decoration-none text-muted fw-semibold"
                        >
                          {p.vendor.name}
                        </Link>
                      ) : (
                        "Vendor"
                      )}
                    </div>
                      <Card.Text>
                        Rp {p.price.toLocaleString()}
                      </Card.Text>
                      <Link to={`/product/${p._id}`}>
                        <Button size="sm" className="w-100">
                          Detail Produk
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Card>

        {/* ================= PROMO KOLAB ================= */}
        <h5 className="fw-bold text-primary mb-3">
          Promo Kolaborasi Vendor 🤝
        </h5>

        <Carousel interval={3500}>
          {promoKolab.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                src={item.img}
                alt={item.title}
                className="d-block w-100 rounded"
                style={{ height: "260px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h5 className="bg-dark bg-opacity-50 px-2 rounded">
                  {item.title}
                </h5>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* ================= PRODUK PER KATEGORI ================= */}
        <div className="mt-5">
          <h4 className="fw-bold text-primary mb-4">
            Produk per Kategori Vendor 🛒
          </h4>

          {categories.map((cat) => {
            const products = productsByCategory[cat] || [];
            if (products.length === 0) return null;

            return (
              <div key={cat} className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold">{cat}</h5>
                  <Link to={`/category/${cat.toLowerCase()}`}>
                    <Button variant="outline-primary" size="sm">
                      Lihat Semua
                    </Button>
                  </Link>
                </div>

                <Row xs={2} md={3} lg={6} className="g-3">
                  {products.slice(0, 6).map((p) => (
                    <Col key={p._id}>
                      <Card className="shadow-sm border-0 h-100">
                        <Card.Img
                          src={p.image}
                          style={{ height: "150px", objectFit: "cover" }}
                        />
                        <Card.Body>
                          <Card.Title className="small fw-bold">
                            {p.name}
                          </Card.Title>
                           {/* NAMA VENDOR */}
                                <div className="small mb-1">
                                👤{" "}
                                {p.vendor ? (
                                  <Link
                                    to={`/vendor/store/${p.vendor._id}`}
                                    className="text-decoration-none text-muted fw-semibold"
                                  >
                                    {p.vendor.name}
                                  </Link>
                                ) : (
                                  "Vendor"
                                )}
                              </div>

                          <Card.Text className="fw-semibold">
                            Rp {p.price.toLocaleString()}
                          </Card.Text>
                          <Link
                            to={`/product/${p._id}`}
                            className="btn text-light btn-primary w-100">
                            Lihat Detail
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}
