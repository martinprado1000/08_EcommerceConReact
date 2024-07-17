import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Item = ({ id, brand, model, category, price, img, stock, description }) => {

  const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });
  
  return !isSmallScreen ? ( 
    <Card className="d-flex mt-2" style={{ width: '200px', minHeight: '400px' }}>
        <Card.Img variant="top" src={img} alt={brand} style={{ objectFit: 'contain', height: '200px' }} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{brand}</Card.Title>
          <Card.Text>Modelo: {model}</Card.Text>
          <Card.Text className="fw-bold align-self-center">${price}</Card.Text>
          <Button as={Link} to={`/product/${id}`} variant="primary" className="mt-auto">
            Detalle del producto
          </Button>
        </Card.Body>  
      </Card>
  ) : (
      <Card className="d-flex flex-row mt-2" style={{ width: '400px', minHeight: '200px' }}>
      <Card.Img src={img} style={{ objectFit: 'contain', width: '200px', height: '200px' }} 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{brand}</Card.Title>
        <Card.Text>Modelo: {model}</Card.Text>
        <Card.Text className="fw-bold  align-self-center">${price}</Card.Text>
        <Button as={Link} to={`/product/${id}`} variant="primary" className="mt-auto">
          Detalle del producto
        </Button>
      </Card.Body>
    </Card>
  );

};

export default Item;
