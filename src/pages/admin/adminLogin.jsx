import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      // ⬇️ INI PENTING
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="fw-bold mb-4">Login Super Admin</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email admin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-dark w-100">
          Login Admin
        </button>
      </form>
    </div>
  );
}
