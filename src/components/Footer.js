import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm";
import logo from "../assets/img/logo2.svg";
import navIcon1 from "../assets/img/nav-icon1.svg"; // LinkedIn
import navIcon2 from "../assets/img/nav-icon2.svg"; // GitHub
import navIcon3 from "../assets/img/nav-icon3.svg"; // Instagram

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <MailchimpForm />
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">

            <div className="contact-links">
              <a href="mailto:choi.coco@northeastern.edu" aria-label="Email Coco">choi.coco@northeastern.edu</a>
              <span className="sep">·</span>
              <a href="tel:+17814928249" aria-label="Call Coco">+1 (781) 492‑8249</a>
            </div>

            <p>© 2025 Coco Choi</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
