import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(140);
  const toRotate = ["Full-Stack SWE", "Data Engineer", "HCI Researcher", "ML Enthusiast"];
  const period = 1600;

  useEffect(() => {
    const ticker = setTimeout(() => tick(), delta);
    return () => clearTimeout(ticker);
    // eslint-disable-next-line
  }, [text]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);
    setText(updatedText);

    if (isDeleting) setDelta((prev) => Math.max(60, prev / 1.8));

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(120);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">Software Development · Data Engineering</span>
                  <h1>
                    {`Hi! I'm Coco`}{" "}
                    <span className="txt-rotate" data-period="1000" data-rotate='[ "Full-Stack SWE", "Data Engineer", "HCI Researcher", "ML Enthusiast" ]'>
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <p>
                    MSCS @ Northeastern (4.0). I build interactive, data‑driven apps across web, data,
                    and mobile—recently at UbiWell Lab, Audi, and Mars Inc.
                  </p>
                  <div className="banner-cta">
                    <a className="cta-btn" href={`${process.env.PUBLIC_URL}/resume/Coco_Cai_Resume.pdf`} target="_blank" rel="noopener noreferrer" aria-label="Open my resume in a new tab">
                      View Résumé
                    </a>
                    <a className="cta-btn" href="mailto:choi.coco@northeastern.edu?subject=Hello%20Coco&body=Hi%20Coco%2C%0A" aria-label="Send me an email">
                      Contact Me
                    </a>
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header" className="floaty-img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
