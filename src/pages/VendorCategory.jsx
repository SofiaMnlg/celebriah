import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";

const VendorCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/category/${category}`
        );
        setProducts(data);

        // DEBUG – cek vendor
        console.log("PRODUCTS:", data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="container my-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/vendor" className="text-decoration-none">Vendor</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {formattedCategory}
          </li>
        </ol>
      </nav>

      {/* Title */}
      <h2 className="fw-bold mb-4">{formattedCategory}</h2>

      {/* Product List */}
      <Row xs={2} md={3} lg={6} className="g-3">
        {products.map((p) => {
          // Vendor bisa object atau string (ID)
          const vendorId = typeof p.vendor === "string" ? p.vendor : p.vendor?._id;
          const vendorName =
            typeof p.vendor === "string" ? "Lihat Vendor" : p.vendor?.name;

          return (
            <Col key={p._id}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Img
                  src={p.image}
                  style={{ height: "150px", objectFit: "cover" }}
                />

                <Card.Body>
                  <Card.Title className="small fw-bold">{p.name}</Card.Title>

                  {/* Vendor */}
                  <div className="small mb-1">
                    👤{" "}
                    {vendorId ? (
                      <Link
                        to={`/vendor/store/${vendorId}`}
                        className="text-decoration-none text-muted fw-semibold"
                      >
                        {vendorName}
                      </Link>
                    ) : (
                      "Vendor"
                    )}
                  </div>

                  {/* Price */}
                  <Card.Text className="fw-semibold">
                    Rp {p.price.toLocaleString()}
                  </Card.Text>

                  {/* Button */}
                  <Link
                    to={`/product/${p._id}`}
                    className="btn text-light btn-primary w-100"
                  >
                    Lihat Detail
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default VendorCategory;
