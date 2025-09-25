import { useState, useEffect, useRef } from "react";
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
    if (!isDeleting && updatedText === fullText) { setIsDeleting(true); setDelta(period); }
    else if (isDeleting && updatedText === "") { setIsDeleting(false); setLoopNum(loopNum + 1); setDelta(120); }
  };

  // === C) 鼠标视差（右侧插画） ===
  const wrapRef = useRef(null);
  const onParallaxMove = (e) => {
    const r = wrapRef.current?.getBoundingClientRect(); if (!r) return;
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);   // -1..1
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);  // -1..1
    wrapRef.current.style.setProperty("--ry", `${dx * 10}deg`);
    wrapRef.current.style.setProperty("--rx", `${dy * -10}deg`);
    wrapRef.current.style.setProperty("--tx", `${dx * 6}px`);
    wrapRef.current.style.setProperty("--ty", `${dy * 6}px`);
  };
  const onParallaxLeave = () => {
    if (!wrapRef.current) return;
    wrapRef.current.style.setProperty("--ry", `0deg`);
    wrapRef.current.style.setProperty("--rx", `0deg`);
    wrapRef.current.style.setProperty("--tx", `0px`);
    wrapRef.current.style.setProperty("--ty", `0px`);
  };

  // === D) CTA 光圈跟随（两个按钮共用一个变量） ===
  const ctaRef = useRef(null);
  const onCtaMove = (e) => {
    const r = ctaRef.current?.getBoundingClientRect(); if (!r) return;
    ctaRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ctaRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
      <section className="banner hero" id="home">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility once>
                {({ isVisible }) => (
                    <div className={`${isVisible ? "animate__animated animate__fadeIn" : ""}`}>
                      <span className="tagline shimmer">Software Development · Data Engineering</span>

                      <h1 className="headline">
                        <span className="gradient-text">Hi! I'm Coco</span>{" "}
                        <span className="txt-rotate" data-period="1000"
                              data-rotate='[ "Full-Stack SWE", "Data Engineer", "HCI Researcher", "ML Enthusiast" ]'>
                      <span className="wrap">{text}</span>
                    </span>
                      </h1>

                      <p className="stagger" style={{ maxWidth: 640 }}>
                        <span>MSCS @ Northeastern (4.0).</span><br/>
                        <span>I build interactive, data-driven apps across web, data, and mobile—</span><br/>
                        <span>recently at UbiWell Lab, Audi, and Mars Inc.</span>
                      </p>

                      <div ref={ctaRef} className="cta-field" onMouseMove={onCtaMove}>
                        <a className="cta-btn" href={`${process.env.PUBLIC_URL}/resume/Coco_Cai_Resume.pdf`} target="_blank" rel="noopener noreferrer">
                          View Résumé
                        </a>
                        <a className="cta-btn" href="mailto:choi.coco@northeastern.edu?subject=Hello%20Coco&body=Hi%20Coco%2C%0A">
                          Contact Me
                        </a>
                      </div>

                      <div className="scroll-cue">↓</div>
                    </div>
                )}
              </TrackVisibility>
            </Col>

            <Col xs={12} md={6} xl={5}>
              <TrackVisibility once>
                {({ isVisible }) => (
                    <div
                        ref={wrapRef}
                        className={`parallax-wrap ${isVisible ? "animate__animated animate__zoomIn" : ""}`}
                        onMouseMove={onParallaxMove}
                        onMouseLeave={onParallaxLeave}
                    >
                      <img src={headerImg} alt="Header" className="floaty-img parallax-item" />
                    </div>
                )}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
  );
};
