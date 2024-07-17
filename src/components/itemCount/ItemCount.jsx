import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";

const ItemCount = ({ initial, stock, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <ButtonGroup>
        <Button disabled={quantity === 0}>
          <IoMdRemove onClick={()=>decrement()}/>
        </Button>
        <Button>{quantity}</Button>
        <Button>
          <IoMdAdd onClick={()=>increment()}/>
        </Button>
      </ButtonGroup>
      <Button className="ms-1" disabled={quantity === 0} onClick={()=>onAdd(quantity)}>Agregar al carrito</Button>
    </div>
  );
};

export default ItemCount;
