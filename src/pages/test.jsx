import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const Test = () => {
  return( 
    <>
    <Container>
        <Row className="justify-content-center border border-solid">
            <Col xs={2} className="d-flex justify-content-center align-items-center border border-solid border-primary" style={{ height: '100px' }}>1111111</Col>
        </Row>
        <Row className="align-items-center border border-solid" style={{ height: '100px' }}>
            <Col xs={2} className="d-flex justify-content-center border border-solid border-primary">2</Col>
        </Row>
    </Container>

    <Container className="border border-solid border-primary mt-2">
        <Row className="justify-content-end align-items-center" style={{ height: '150px' }}>
            <Col xs={3} className="d-flex justify-content-center align-items-center bg-primary text-white " style={{ height: '100px' }}>Col 1</Col>
            <Col xs={3} className="d-flex bg-secondary align-items-end text-white" style={{ height: '100px' }}>Col 2</Col>     
        </Row>
    </Container>

    <Container className="mt-2">
        <Row xs={4}  className="justify-content-center align-items-center border border-solid" style={{ height: '120px' }}>
            <Col className="d-flex  border border-solid border-primary" style={{ height: '80px' }}>1111111</Col>
            <Col className="d-flex  align-items-center border border-solid border-primary" style={{ height: '80px' }}>1111111</Col>
            <Col className="d-flex  align-items-end border border-solid border-primary" style={{ height: '80px' }}>1111111</Col>
        </Row>
    </Container>
</>



  )
};

export default Test;
