import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCount from "../itemCount/ItemCount";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

import { useProductsContext } from "../../contexts/ProductsContext";

const ItemDetail = () => {
  const { getProductsById, productById, loading } = useProductsContext();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getProductsById(id);
  }, []);

  return (
    <Container className="d-flex mt-4 justify-content-center">
      {loading ? (
        <>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="fs-4 ms-2">Loading...</p>
        </>
      ) : (
        <>
          {productById == undefined ? (
            <Container>
              <h2 className="d-flex justify-content-center">
                Producto inexistente
              </h2>
              <div className="d-flex justify-content-center mt-3">
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Volver
                </Button>
              </div>
            </Container>
          ) : (
            <Container fluid>
              <Row sm={2}>
                <Row className="justify-content-center">
                  <Col className="d-flex align-items-center justify-content-center">
                    <Image
                      src={productById.img}
                      thumbnail
                      className="border-0"
                      style={{ objectFit: "contain", height: "300px" }}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Marca:</Form.Label>
                      <Form.Control
                        type="brand"
                        value={productById.brand}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Modelo: </Form.Label>
                      <Form.Control
                        type="description"
                        value={productById.model}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Descripción: </Form.Label>
                      <Form.Control
                        type="description"
                        value={productById.description}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Precio: </Form.Label>
                      <Form.Control
                        type="description"
                        value={`$ ${productById.price}`}
                        disabled
                      />
                    </Form.Group>

                    <ItemCount
                      className="d-flex justify-content-center"
                      productById={productById} 
                    />

                  </Form>
                </Row>
              </Row>
            </Container>
          )}
        </>
      )}
    </Container>
  );
};

export default ItemDetail;
