import { Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavigationBar() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    navigate("/login-user");
  };

  return (
    <Navbar expand="lg" className="shadow-sm bg-navy">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
          Celebrate.id 🎉
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" className="bg-light" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/about" className="text-white">
              About
            </Nav.Link>

            {auth ? (
              <NavDropdown
                title={<span className="text-white">{auth.name}</span>}
                align="end"
                menuVariant="light"
              >
                {/* MENU VENDOR */}
                {auth.role === "vendor" && (
                  <>
                    <NavDropdown.Item as={Link} to="/vendor/dashboard">
                      Dashboard Vendor
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      as={Link}
                      to={`/vendor/profile/${auth._id}`}
                    >
                      Profil Toko
                    </NavDropdown.Item>
                  </>
                )}

                {/* MENU USER */}
                {auth.role === "user" && (
                  <NavDropdown.Item as={Link} to="/profile">
                    Profil Saya
                  </NavDropdown.Item>
                )}

                {/* MENU ADMIN */}
                {auth.role === "admin" && (
                  <NavDropdown.Item as={Link} to="/admin/dashboard">
                    Dashboard Admin
                  </NavDropdown.Item>
                )}

                <NavDropdown.Divider />

                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger fw-bold"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login-user" className="text-white">
                  Login
                </Nav.Link>

                <Button
                  as={Link}
                  to="/register-user"
                  variant="outline-light"
                  className="ms-2 px-3 rounded-pill fw-semibold"
                >
                  Daftar
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
