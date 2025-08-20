import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import projImg4 from "../assets/img/project-img4.png";
import projImg5 from "../assets/img/project-img5.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const featured = [
    { title: "Audi e‑Charging App", description: "EV charging companion app: React Native + Spring Boot backend", imgUrl: projImg1, linkUrl: "https://github.com/Cocochoiii/audi-e-charging-app" },
    { title: "Media Recs Sample", description: "LLM + BERT embeddings; contrastive training on interactions", imgUrl: projImg2, linkUrl: "https://github.com/Cocochoiii/media-recs-sample" },
    { title: "Mars Commerce", description: "E‑commerce demo: Node/Express microservices + MongoDB", imgUrl: projImg3, linkUrl: "https://github.com/Cocochoiii/mars-commerce" },
  ];

  const research = [
    { title: "Research Hub Sample", description: "React/TS + Elasticsearch search UI", imgUrl: projImg4, linkUrl: "https://github.com/Cocochoiii/research-hub-sample" },
    { title: "UbiWell Full‑Stack Sample", description: "Health data dashboards & APIs", imgUrl: projImg5, linkUrl: "https://github.com/Cocochoiii/ubiwell-lab-fullstack-sample" },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Featured</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Research</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {featured.map((p, idx) => (
                            <ProjectCard key={idx} {...p} />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Row>
                          {research.map((p, idx) => (
                            <ProjectCard key={idx} {...p} />
                          ))}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="" />
    </section>
  );
};
