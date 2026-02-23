import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VendorRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.password2) {
      return alert("Password tidak sama!");
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/vendors/register`, // Mengubah ke rute vendor
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );

      alert("Registrasi vendor berhasil!");
      navigate("/login-vendor"); // Arahkan ke halaman login vendor setelah berhasil registrasi
    } catch (err) {
      alert("Registrasi vendor gagal: " + err.response?.data?.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registrasi Vendor</h2>
      <form onSubmit={handleSubmit} className="w-50">
        
        <div className="mb-3">
          <label>Nama Vendor</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Ulangi Password</label>
          <input
            type="password"
            name="password2"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100">Daftar Vendor</button>
      </form>
    </div>
  );
}

export default VendorRegister;
