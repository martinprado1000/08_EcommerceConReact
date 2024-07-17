import React from "react";
import { getProducts, getProductsByCategory } from "../../products";
import { useState, useEffect } from "react";
import ItemList from "../itemList/ItemList";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from "react-router-dom";  

function ItemListContainer() {

  const navigate = useNavigate();
  const [products, setProducts] = useState([""]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const category = params.category;

  const validCategories = ['celular', 'tablet', "notebook"];
  useEffect(() => {
    if (!validCategories.includes(category)) {
      navigate('/errorPage');
    }
  }, [category, navigate]);

  useEffect(() => {
    setLoading(true);
    if (category === undefined) {
      getProducts()
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      getProductsByCategory(category)
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
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
          <ItemList products={products} />
        )}
      </Container>
    </>
  );
}

export default ItemListContainer;
