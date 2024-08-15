import { useEffect } from "react";
import ItemList from "../itemList/ItemList";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";

import { useProductsContext } from "../../contexts/ProductsContext";

function ItemListContainer() {

  const { getProducts, loading } = useProductsContext();
  const params = useParams();
  const category = params.category;

  useEffect(() => {
    getProducts(params.category);
  }, [category]);

  return (
    <>
      <Container className="mt-2 d-flex justify-content-center">
        {loading ? (
          <>
            <Spinner className="mt-4" animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="fs-4 ms-2 mt-4">Loading...</p>
          </>
        ) : (
          <ItemList />
        )}
      </Container>
    </>
  );
}

export default ItemListContainer;
