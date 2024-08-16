import React from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";

const ErrorUrl = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="justify-content-center">
        <h2 className="d-flex justify-content-center mt-5">
          Error 404: URL inexistente
        </h2>
        <div className="d-flex justify-content-center mt-3">
          <Button onClick={() => {
            navigate("/")}
            }>Volver al inicio</Button>
        </div>
      </Row>
    </Container>
  );
};

export default ErrorUrl;
