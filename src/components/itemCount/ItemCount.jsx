import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import Modal from "react-bootstrap/Modal";
import { useUsersContext } from "../../contexts/UsersContext";

// Componente modal separado
const ModalAlert = ({ show, handleClose, stock }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Stock insuficiente</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`Cantidad máxima para agregar: ${stock}`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalAlertLogin = ({ showLogin, handleCloseLogin }) => {
  return (
    <Modal show={showLogin} onHide={handleCloseLogin} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Login requerido</Modal.Title>
      </Modal.Header>
      <Modal.Body>Debes estar logueado para agregar productos a tu carrito</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseLogin}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ItemCount = ({productById}) => {
  const productId = productById.id;
  const stock = productById.stock;
  //console.log(productId)
  //console.log(stock)
  const { isLogged,addProductToCart } = useUsersContext();
 
  // Estado del modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    } else {
      setShow(true);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = (quantity) => {
    if (isLogged) {
      addProductToCart(quantity,productId)
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <ButtonGroup>
        <Button disabled={quantity === 0} onClick={decrement}>
          <IoMdRemove />
        </Button>
        <Button>{quantity}</Button>
        <Button onClick={increment}>
          <IoMdAdd />
        </Button>
      </ButtonGroup>
      <Button
        className="ms-1"
        disabled={quantity === 0}
        onClick={() => addToCart(quantity)}
      >
        Agregar al carrito
      </Button>
      

      {/* Bootstrap Modal */}
      <ModalAlert show={show} handleClose={handleClose} stock={stock} />

      {/* Bootstrap Modal */}
      <ModalAlertLogin showLogin={showLogin} handleCloseLogin={handleCloseLogin} />
    </div>
  );
};

export default ItemCount;
