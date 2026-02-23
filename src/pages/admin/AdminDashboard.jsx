import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const [usersRes, vendorsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/users", config),
        axios.get("http://localhost:5000/api/admin/vendors", config),
      ]);

      setUsers(usersRes.data);
      setVendors(vendorsRes.data);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  /* =============================
     EXPORT CSV
  ============================== */
  const exportCSV = async (type) => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/admin/export/${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Gagal export CSV");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Dashboard Super Admin</h2>

      {/* ================= STATS ================= */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5>👤 Total Users</h5>
            <h2 className="fw-bold">{users.length}</h2>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5>🏪 Total Vendors</h5>
            <h2 className="fw-bold">{vendors.length}</h2>
          </div>
        </div>
      </div>

      {/* ================= EXPORT BUTTONS ================= */}
      <div className="d-flex gap-3 mb-4">
        <button
          className="btn btn-success"
          onClick={() => exportCSV("users")}
          disabled={loading}
        >
          ⬇️ Export Users CSV
        </button>

        <button
          className="btn btn-primary"
          onClick={() => exportCSV("vendors")}
          disabled={loading}
        >
          ⬇️ Export Vendors CSV
        </button>
      </div>

      {/* ================= USERS TABLE ================= */}
      <h4 className="fw-bold mt-4">📊 Data Users</h4>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u._id}>
              <td>{i + 1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= VENDORS TABLE ================= */}
      <h4 className="fw-bold mt-5">🏪 Data Vendors</h4>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v, i) => (
            <tr key={v._id}>
              <td>{i + 1}</td>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{new Date(v.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
