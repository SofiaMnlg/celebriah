import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import ProductCard from "../../components/ProductCard";

export default function VendorStore() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/vendors/${id}`);
        setVendor(res.data.vendor);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!vendor) return <p className="text-center mt-5">Toko tidak ditemukan</p>;

  return (
    <div className="container my-5">
      {/* HEADER TOKO */}
      <div className="mb-4">
        <h2 className="fw-bold">{vendor.name}</h2>
        {vendor.description && (
          <p className="text-muted">{vendor.description}</p>
        )}
      </div>

      <hr />

      {/* PRODUK */}
      <div className="row">
        {products.length === 0 ? (
          <p>Belum ada produk</p>
        ) : (
          products.map((p) => (
            <div key={p._id} className="col-md-4 mb-4">
              <ProductCard product={p} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
