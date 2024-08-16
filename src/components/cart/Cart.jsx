import React from "react";
import { useUsersContext } from "../../contexts/UsersContext";
import { useProductsContext } from "../../contexts/ProductsContext";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//Sweet Alert 2
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Cart = () => {
  const { products } = useProductsContext();

  const { userCart, deleteProductsCart, deleteOneProductsCart } = useUsersContext();

  let cartWithDetails = [];

  if ( userCart.length != 0 ) {
    if(userCart[0].product != []){
    const cart = userCart[0].products;
    cartWithDetails = cart.map((cartItem) => {
      const productDetails = products.find(
        (product) => product.id === cartItem.product
      );
      return {
        ...cartItem,
        ...productDetails,
      };
    });
  }
  } else {
    cartWithDetails = [];
  }

  return (
    <div className="mt-3 mx-4">
      {cartWithDetails.length == 0 ? (
        <p className="mx-3 mt-3 row text-center alert h4">
          No existen productos en tu carrito
        </p>
      ) : (
        <>
          <Table striped bordered hover variant="dark" className="">
            <thead>
              <tr className="row">
                <th className="col-4">Marca</th>
                <th className="col-2">Modelo</th>
                <th className="col-1">Imagen</th>
                <th className="col-1">Precio</th>
                <th className="col-1">Stock</th>
                <th className="col-1">Quantity</th>
                {/* <th className="col-3"></th> */}
                <th className="col-2"></th>
              </tr>
            </thead>

            <tbody>
              {cartWithDetails &&
                cartWithDetails.map((products) => (
                  <tr className="row" key={products.id}>
                    <td className="col-4">{products.brand}</td>
                    <td className="col-2">{products.model}</td>
                    <td className="col-1">
                      <img style={{ height: "30px" }} src={products.img} />
                    </td>
                    <td className="col-1">{products.price}</td>
                    <td className="col-1">{products.stock}</td>
                    <td className="col-1">{products.quantity}</td>
                    {/* <td className="col-3">
                      <Form
                        onSubmit={
                          (e) => console.log("hola")
                          //handleSubmitEditQuantity(e, products.product._id)
                        }
                      >
                        <InputGroup size="sm">
                          <Form.Control
                            value="test"
                            type="number"
                            placeholder="Cantidad"
                            //onChange={(e) => setEditQuantity(e.target.value)}
                          />
                          <Button type="submit" className="btn-info">
                            Editar cantidad
                          </Button>
                        </InputGroup>
                      </Form>
                    </td> */}
                    <td className="col-2">
                      <button
                        className="btn btn-danger btn-sm d-block mx-auto"
                        onClick={() => deleteOneProductsCart(products.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button
            type="submit"
            className="btn-success"
            onClick={() => deleteProductsCart()}
          >
            Comprar productos
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
