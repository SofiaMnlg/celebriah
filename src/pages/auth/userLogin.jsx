import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );

      if (res.data.role !== "user") {
        return setError("Akun ini bukan akun User!");
      }

      // 🔥 SIMPAN KE AUTH (FORMAT BARU)
      localStorage.setItem(
        "auth",
        JSON.stringify({
          _id: res.data.user._id,
          name: res.data.user.name,
          role: "user",
          token: res.data.token,
        })
      );

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="fw-bold mb-4">Login User</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
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

        <button className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}
