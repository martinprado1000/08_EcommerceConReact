import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Item from "../item/Item";

const ItemList = ({ products }) => {
  return (  
    <Container className="mt-2">
      <Row>
        {products.map((product) => (
          <Col key={product.id}>
            <Item {...product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemList;
