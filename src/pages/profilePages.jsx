import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="container mt-5">
        <h2>Profil Pengguna</h2>
        <p>Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profil Pengguna</h2>

      <div className="card p-4 shadow-sm" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <strong>Nama:</strong>
          <p>{user.name}</p>
        </div>

        <div className="mb-3">
          <strong>Email:</strong>
          <p>{user.email}</p>
        </div>

        <div className="mb-3">
          <strong>Role:</strong>
          <p>{user.role}</p>
        </div>
      </div>
    </div>
  );
}
