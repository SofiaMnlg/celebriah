import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, form);
      navigate("/login-user");
    } catch (err) {
      alert(err.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Daftar User</h2>
      <form onSubmit={handleSubmit} className="w-50">
        <input name="name" placeholder="Nama" className="form-control mb-2" onChange={handleChange} />
        <input name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="form-control mb-3" onChange={handleChange} />
        <button className="btn btn-primary w-100">Daftar</button>
      </form>
    </div>
  );
}
