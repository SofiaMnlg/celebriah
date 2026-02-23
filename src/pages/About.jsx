import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
  return (
    <div className="py-5" style={{ backgroundColor: "#5a8dbf" }}>
      <Container>

        {/* SECTION 1 — Gambar di kanan */}
        <Row className="align-items-center g-4 mb-5 text-white">
          <Col md={6}>
            <h2 className="fw-bold mb-3">Tentang Celebrate.id</h2>

            <p className="mb-3">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis orci a massa aliquet iaculis. Sed ullamcorper interdum fringilla. Morbi eu commodo eros, vitae rhoncus urna. Curabitur consectetur tortor in metus porttitor fermentum. Etiam in tempus ligula. Etiam malesuada justo et iaculis ultricies. Etiam ultrices odio id suscipit volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus a quam sit amet consectetur. Curabitur at est eget felis sodales luctus id id nunc. Duis dictum erat ut magna convallis, sit amet venenatis sem maximus. 
            </p>

            <p className="mb-4">
              Donec posuere porttitor malesuada. In tempor libero massa. Nunc dictum, mauris eu auctor vulputate, justo metus faucibus libero, non vehicula ex nisi ut eros. Suspendisse potenti. Vestibulum nunc erat, dapibus sed maximus id, commodo non lacus. Praesent facilisis maximus lacus, ac scelerisque arcu pretium sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras lobortis leo et tellus condimentum fermentum. Donec metus nisi, volutpat in condimentum in, finibus ut mauris. Duis eros enim, pretium sed metus eget, iaculis placerat nibh. Mauris in nulla venenatis nisl commodo aliquam. 
            </p>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm border-0 overflow-hidden rounded-4">
              <Card.Img
                src="https://chicandstylishweddings.com/wp-content/uploads/2019/05/romantic-styled-shoot-pastel-hues-ft.jpg"
                style={{ height: "350px", objectFit: "cover" }}
              />
            </Card>
          </Col>
        </Row>

        {/* SECTION 2 — Text di tengah */}
        <Row className="justify-content-center text-center mb-5 px-md-5 text-white">
          <Col md={8}>
            <p className="mb-3">
              Maecenas sed ex at erat tincidunt dapibus ut id sem. Nam vel consectetur dolor. Aliquam pulvinar, enim eu finibus ornare, nulla tellus interdum eros, eget accumsan urna nisl non diam. Donec velit leo, lacinia ac maximus lacinia, lobortis mattis tellus. Nulla in nulla a libero ultricies lobortis. Nullam mattis nibh vel condimentum tristique. Ut tristique, orci et pharetra faucibus, urna lorem pharetra nulla, sed aliquam dui turpis condimentum metus. 
            </p>

            <p className="mb-4">
               Aenean luctus scelerisque fringilla. Duis est sapien, iaculis quis posuere eget, dapibus vel mauris. Suspendisse mollis urna elit, id iaculis mauris semper lacinia. Fusce ultrices venenatis ligula, vitae placerat lorem tempor sed. Donec consequat bibendum consequat. Pellentesque molestie, massa vitae efficitur pulvinar, tellus eros ullamcorper enim, ut aliquet turpis eros eu nunc. Etiam ultrices lobortis magna. Morbi ultrices mauris vel ligula ultrices ornare. Quisque placerat eleifend tristique. Cras interdum at augue eget aliquam. Nullam in velit erat. Nulla aliquam, est at malesuada suscipit, turpis purus pulvinar tortor, vitae porta diam urna nec urna. Cras in ornare nulla. 
            </p>
          </Col>
        </Row>

        {/* SECTION 3 — Gambar di kiri */}
        <Row className="align-items-center g-4 mb-5 flex-md-row-reverse text-white">
          <Col md={6}>
            <p>
              Mauris aliquam, lacus porttitor tempor dictum, libero quam luctus ex, commodo malesuada nulla lectus at lacus. In gravida tellus tellus, id consequat orci pellentesque a. Pellentesque aliquam, tellus a interdum porttitor, est dolor blandit est, at scelerisque ligula enim eget justo. Cras aliquet, ipsum ac pellentesque pretium, quam magna hendrerit velit, eget fringilla tellus nisi eu sapien. Praesent porta ultricies tortor vitae tempus. Aenean lorem dolor, tempor ut tincidunt eget, gravida eget nisl. Vivamus cursus purus aliquam, vehicula risus in, faucibus sem. Integer sed ipsum sapien. Nulla at ex in lorem blandit aliquam vitae sed ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a metus ac augue hendrerit ultricies. Nam euismod nisi lorem.
            </p>

            <p className="mb-4">
              Dengan berbagai kategori layanan, pengguna dapat menemukan vendor
              terbaik hanya dalam beberapa klik saja.
            </p>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm border-0 overflow-hidden rounded-4">
              <Card.Img
                src="https://external-preview.redd.it/aesthetic-bouquet-v0-uNx4MBydgH1jI_36JQ4msruOTq5l9JeIZSpMiin_Ob8.jpeg?width=640&crop=smart&auto=webp&s=7199bd451e7877af9969e6a581f380bddbab7719"
                style={{ height: "350px", objectFit: "cover" }}
              />
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
}
