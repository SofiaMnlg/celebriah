import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="card h-100 d-flex flex-column">
      {/* GAMBAR */}
      <img
        src={product.images?.[0] || "/placeholder.jpg"}
        className="card-img-top"
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />

      {/* CONTENT */}
      <div className="card-body flex-grow-1">
        <h5 className="card-title">{product.name}</h5>

        <p className="card-text text-muted">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        <p className="card-text">
          {product.description?.slice(0, 80)}...
        </p>
      </div>

      {/* FOOTER BUTTON */}
      <div className="card-footer bg-white border-0 pb-3">
        <Link
          to={`/product/${product._id}`}
          className="btn btn-primary text-white w-100"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
