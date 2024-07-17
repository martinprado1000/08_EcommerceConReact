import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCount from "../itemCount/ItemCount";
import { getProductsById } from "../../products";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

const ItemDetail = () => {
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState({});

  // getProductsById(id).then((data)=>data.JSON()).then((data)=>console.log(data))
  useEffect(() => {
    getProductsById(id)
      .then((data) => {
        setLoading(false);
        setProductId(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="d-flex mt-5 justify-content-center">
      {loading ? (
        <>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="fs-4 ms-2">Loading...</p>
        </>
      ) : (
        <>
          <Container fluid>
            <Row sm={2}>
              <Row  className="justify-content-center">
                <Col className="d-flex align-items-center justify-content-center">
                  <Image  src={productId.img} thumbnail className="border-0" style={{ objectFit: 'contain', height: '300px' }}/>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">  
                    <Form.Label>Marca:</Form.Label>
                    <Form.Control type="brand" value={productId.brand} disabled/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Modelo: </Form.Label>
                    <Form.Control type="description" value={productId.model} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Descripción: </Form.Label>
                    <Form.Control type="description" value={productId.description} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Precio: </Form.Label>
                    <Form.Control type="description" value={`$ ${productId.price}`} disabled />
                  </Form.Group>
                  <ItemCount className="d-flex justify-content-center"
                    initial={1}
                    stock={productId.stock}
                    onAdd={(cant) => {
                      console.log(`Cantidad agregada:${cant}`);
                    }}
                  />
                </Form>
              </Row>
            </Row>
          </Container>
        </>
      )}
    </Container>
  );
};

export default ItemDetail;
