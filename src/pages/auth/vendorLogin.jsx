import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function VendorLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      return setError("Email dan password wajib diisi");
    }

    try {
      setLoading(true);

      const res = await API.post("/vendors/login", {
        email: form.email,
        password: form.password,
      });

      // ✅ FORMAT SERAGAM (USER & VENDOR)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: res.data._id,
          name: res.data.name, // nama vendor
          email: res.data.email,
          role: res.data.role, // "vendor"
        })
      );

      navigate("/vendor/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container mt-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h4 className="fw-bold text-center mb-4">Login Vendor</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email vendor"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            className="btn btn-dark w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Login Vendor"}
          </button>
        </form>
      </div>
    </div>
  );
}
