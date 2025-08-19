import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import { BrowserRouter as Router } from "react-router-dom";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => setActiveLink(value);

  return (
    <Router>{/* 如果 App 最外层已经有 Router，这个就删掉 */}
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          {/* 用 HashLink 返回到 #home，避免整页刷新 */}
          <Navbar.Brand as={HashLink} to="#home" smooth>
            <img src={logo} alt="Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={HashLink}
                smooth
                to="#home"
                className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
                onClick={() => onUpdateActiveLink('home')}
              >Home</Nav.Link>

              <Nav.Link
                as={HashLink}
                smooth
                to="#education"
                className={activeLink === 'education' ? 'active navbar-link' : 'navbar-link'}
                onClick={() => onUpdateActiveLink('education')}
              >Education</Nav.Link>

              <Nav.Link
                as={HashLink}
                smooth
                to="#skills"
                className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'}
                onClick={() => onUpdateActiveLink('skills')}
              >Skills</Nav.Link>

              {/* 复数 -> 单数，并用 HashLink */}
              <Nav.Link
                as={HashLink}
                smooth
                to="#experience"
                className={activeLink === 'experiences' ? 'active navbar-link' : 'navbar-link'}
                onClick={() => onUpdateActiveLink('experiences')}
              >Experiences</Nav.Link>

              <Nav.Link
                as={HashLink}
                smooth
                to="#projects"
                className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'}
                onClick={() => onUpdateActiveLink('projects')}
              >Projects</Nav.Link>
            </Nav>

            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><img src={navIcon1} alt="LinkedIn" /></a>
                <a href="https://github.com/Cocochoiii" target="_blank" rel="noopener noreferrer"><img src={navIcon2} alt="Portfolio" /></a>
                <a href="https://www.instagram.com/cocochoiii_/" target="_blank" rel="noopener noreferrer"><img src={navIcon3} alt="GitHub" /></a>
              </div>
              <HashLink to="#connect" smooth>
                <button className="vvd"><span>Let’s Connect</span></button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  );
}
