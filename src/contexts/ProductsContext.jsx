import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { dbFirestore } from "../db/db.jsx";

const ProductsContext = createContext();
// Funcion hook que exporta el contexto
export function useProductsContext() {
  return useContext(ProductsContext);
}
// Exporto el Provider
export function ProductsProvider({ children }) {

  const navigate = useNavigate();
  const [products, setProducts] = useState({});
  const [productById, setProductById] = useState({});
  const [loading, setLoading] = useState(true);

  // Obtenemos todos los productos o por categoria.
  const getProducts = async (category) => {
    setLoading(true);
    const collectionProductsRef = collection(dbFirestore, "products"); // collection: obtenemos todos los datos de una coleccion
    try {
      if (category === undefined) {
        const snapshot = await getDocs(collectionProductsRef); // getDocs: se usa para obtener documentos
        if (snapshot.size !== 0) {
          const productsList = snapshot.docs.map((doc) => ({
            //id: doc.id, doc: doc.data()
            id: doc.id, ...doc.data(), // Lo hago de esta forma para que la data no quede dentro de .doc
          }));
          setProducts(productsList);
          setLoading(false);
          return;
        } else {
          console.log(`No existe ningun producto`);
          setProducts({});
          setLoading(false);
          return;
        }
      } else {
        const q = query(collectionProductsRef, where("category", "==", category)); // query: generamos una referencia usando condiciones.
        //const q = query(collectionProductsRef, where("category", "==", category), where("stock", "<", 1));
        const snapshot = await getDocs(q);
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id, ...doc.data(),
        }));
        setProducts(productsList);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(`Error inesperado en el sistema: ${error}`);
      navigate("/fatalErrorPage");
      return;
    }
  }; 

  const getProductsById = async (id) => {
    setLoading(true);
    try {
      const productIdRef = doc(dbFirestore, "products", id);
      const snapshot = await getDoc(productIdRef);
      if (snapshot.exists()) {
        setProductById({ id: snapshot.id, ...snapshot.data() });
        setLoading(false);
        return;
      } else {
        console.log("Producto inexistente");
        setProductById(undefined);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(`Error inesperado en el sistema: ${error}`);
      navigate("/fatalErrorPage");
      return;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        loading,
        setLoading,
        products,
        setProducts,
        getProducts,
        productById,
        getProductsById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
