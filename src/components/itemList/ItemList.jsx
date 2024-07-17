import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Item from "../item/Item";
import Button from "react-bootstrap/esm/Button"; 
import { useNavigate } from "react-router-dom"; 

const ItemList = ({ products }) => {
  const navigate = useNavigate()
  return (
    <>
      {products.length > 0 ? (
        <Container className="mt-2">
          <Row>
            {products.map((product) => (
              <Col key={product.id}>
                <Item {...product} />
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <Container className="mt-2">
          <h2 className="d-flex justify-content-center mt-3">
            No existe la categoria
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
      )}
    </>
  );
};

export default ItemList;
