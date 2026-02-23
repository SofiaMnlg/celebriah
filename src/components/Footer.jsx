import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-navy text-light py-4 mt-5">
      <Container className="text-center small">
        <p className="mb-1 fw-semibold">© {new Date().getFullYear()} Celebrate.id</p>
        <p className="mb-0">
          Kolaborasi Mahasiswa & UMKM untuk Merayakan Setiap Momen ✨
        </p>
        
      </Container>
    </footer>
  );
}
