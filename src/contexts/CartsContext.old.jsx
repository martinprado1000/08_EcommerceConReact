import { createContext, useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { dbFirestore } from "../db/db.jsx";

const CartsContext = createContext();

// Este es nuestro hook que exporta el contexto
export function useCartsContext() {
  return useContext(CartsContext);
}

// Provider
export function CartsProvider({ children }) {
  const collectionCartsRef = collection(dbFirestore, "carts");

  const [carts, setCarts] = useState(false);

  const getCarts = async () => {
    try {
      let res = await fetch(`${URL_BACK}/api/carts`);
      let responsBackend = await res.json();
      if (responsBackend.status !== 200) {
        throw error({ error: responsBackend });
      }

      setCarts(responsBackend.data);
      return;
    } catch (error) {
      console.log(`Error inesperado en el sistema: ${error}`);
      window.location.href = "/fatalErrorPage";
      return;
    }
  };

  const createCart = async (userId) => {
    console.log(userId)
    newCart = {
      owner: userId,
      cart: [],
    };
    try {
      const res = await addDoc(collectionCartsRef, newCart);
      if (res.id) {
        console.log("carrito creado");
        return {
          status: 200,
          data: "OK",
        };
      } else {
        console.log("carrito creado");
        return {
          status: 500,
          data: "Error al crear el usuario",
        };
      }
    } catch (e) {
      console.log("errorrrrrrr");
      return {
        status: 500,
        data: `Error en el sistema: ${e}`,
      };
    }
  };

  return (
    <CartsContext.Provider value={{ createCart }}>
      {children}
    </CartsContext.Provider>
  );
}
