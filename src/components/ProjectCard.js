import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, linkUrl }) => {
  const Wrapper = ({ children }) => (
      linkUrl ? <a href={linkUrl} target="_blank" rel="noopener noreferrer">{children}</a> : <>{children}</>
  );

  return (
      <Col size={12} sm={6} md={4}>
        <div className="proj-imgbx">
          <Wrapper>
            <img src={imgUrl} alt={title} />
            <div className="proj-txtx">
              <h4>{title}</h4>
              <span>{description}</span>
            </div>
          </Wrapper>
        </div>
      </Col>
  );
};