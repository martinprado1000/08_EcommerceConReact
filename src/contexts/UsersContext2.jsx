import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { dbFirestore } from "../db/db.jsx";

const UsersContext = createContext();

// Este es nuestro hook que exporta el contexto
export function useUsersContext() {
  return useContext(UsersContext);
}

// Provider
export function UsersProvider({ children }) {
  const [users, setUsers] = useState({});
  //const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [userLogged, setUserLogged] = useState({});
  const [userCart, setUserCart] = useState({});

  const handleLogin = (value) => {
    setIsLogged(value);
  };

  const collectionUsersRef = collection(dbFirestore, "users"); // collection: Le asignamos sobre que colleccion vamos a trabajar.
  
  const getUsers = async () => {
    try {
      const snapshot = await getDocs(collectionUsersRef); // getDocs: se usa para obtener documentos
      if (snapshot.size !== 0) {
        const usersList = snapshot.docs.map((doc) => ({
          //id: doc.id, doc: doc.data()
          id: doc.id,
          ...doc.data(), // Lo hago de esta forma para que la data no quede dentro de .doc
        }));
        setUsers(usersList);
        return;
      } else {
        console.log("no hay usuarios");
        return;
      }
    } catch (error) {
      console.log(`Error inesperado en el sistema: ${error}`);
      navigate("/fatalErrorPage");
      return;
    }
  };

  const getUserByEmail = async (email) => {
    try {
      const q = query(collectionUsersRef, where("email", "==", email)); // query: generamos una referencia usando condiciones.
      const snapshot = await getDocs(q);
      if (snapshot.size !== 0) {
        console.log("Email existente");
        snapshot.docs.map((doc) => setUserLogged({ email: email, id: doc.id }));
        return { status: true, data: "Email existente" };
      } else {
        console.log("El email NO existe");
        return { status: false, data: "El email NO existe" };
      }
    } catch (error) {
      console.log(`Error inesperado en el sistema: ${error}`);
      return { status: 500, data: "Error del servidor" };
      //navigate("/fatalErrorPage");
      //return;
    }
  };

  const createCart = async (userId) => {
    const newCart = {
      owner: userId,
      products: [],
      totalAmount: 0,
    };
    try {
      const res = await addDoc(collectionCartsRef, newCart);
      console.log(res.id)
      if (res.id) {
        return {
          status: 200,
          data: res.id,
        };
      } else {
        return {
          status: 500,
          data: "Error al crear el carrito",
        };
      }
    } catch (e) {
      return {
        status: 500,
        data: `Error en el sistema: ${e}`,
      };
    }
  };

  const addUser = async (newUser) => {
    try {
      const res = await getUserByEmail(newUser.email);
      if (res.status == false) {
        // El usuario no existe por lo tanto lo creo.
        const res = await addDoc(collectionUsersRef, newUser);
        if (res.id) {
          const cart = await createCart(res.id); // Creo el carrito para el nuevo usuario
          console.log(cart.data)
          setIsLogged(true);
          setUserLogged({ email: newUser.email, id: res.id, idCart:cart.data });
          return {
            status: 200,
            data: "OK",
          };
        } else {
          setIsLogged(false);
          setUserLogged({});
          return {
            status: 500,
            data: "Error al crear el usuario",
          };
        }
      } else {
        setIsLogged(false);
        setUserLogged({});
        return {
          status: 401,
          data: "El usuario ya existe",
        };
      }
    } catch (e) {
      return {
        status: 500,
        data: `Error en el sistema: ${e}`,
      };
    }
  };

  const login = async (user) => {
    try {
      const res = await getUserByEmail(user.email);
      if (res.status === true) {
        //setIsLogged(true);
        //console.log(userLogged.id)
        const cart = await getCartByOwner(userLogged.id)
        console.log(cart)
        return {
          status: 200,
          data: "Usuario Logueado satisfactoriamente",
        };
      }
      if (res.status == false) {
        setIsLogged(false);
        setUserLogged({});
        return {
          status: 401,
          data: "Usuario o password incorectos",
        };
      }
      setIsLogged(false);
      setUserLogged({});
      return {
        status: 500,
        data: "Error en el sistema",
      };
    } catch (e) {
      console.log(e);
    }
  };

  //--------Carts----------------------------------------------------------------------------------
  const collectionCartsRef = collection(dbFirestore, "carts");

  const getCartByOwner = async (OwnerId) => {
    try {
      const q = query(collectionCartsRef, where("owner", "==", OwnerId));
      const snapshot = await getDocs(q);
      if (snapshot.size !== 0) {
        snapshot.docs.map((doc) => {
          // console.log(doc.id)
          // console.log(doc.data())
          setUserCart({idCart:doc.id, ...doc.data()});
          //setUserCart(doc.data(), doc.id);
          //id: doc.id, ...doc.data(),
        })
        //console.log(userCart);
        return { status: true, data: "Carrito existente" };
      } else {
        console.log("El Carrito NO existe");
        return { status: false, data: "El Carrito NO existe" };
      }

      // if (snapshot.size !== 0) {
      //   console.log("Carrito existente");
      //   return { status: true, data: "Carrito existente" };

      // } else {
      //   console.log("El Carrito NO existe");
      //   return { status: false, data: "El Carrito NO existe" };
      // }
    } catch (error) {
      console.log(`Error inesperado en el sistema: ${error}`);
      return { status: 500, data: "Error del servidor" };
      //navigate("/fatalErrorPage");
      //return;
    }
  };



  const addProductToCart = async (quantity, productId) => {
    console.log(userLogged);
    //console.log(quantity, productId);
    const cartExist = await getCartByOwner(userLogged.id); // Obtengo el carrito del usuario
    //console.log(cartExist.status);
     
    if (cartExist.status == true) { // Si el carrito existe tengo que verificar si ya tiene el producto
      const productExist = await userCart.products?.some((prod => prod.product == productId))
      console.log(productExist == true);
      if (productExist == true) { // Ya existe el producto

      }

      console.log(userCart); 
      console.log(userCart.idCart)
      // const newCart = {
      //   products: [{ product: productId, quantity }],
      //   totalAmount: 100,
      // };
      const newProduct ={ product: productId, quantity: quantity }
      const documentCartRef = doc(dbFirestore, "carts", userCart.idCart);
      const res = await updateDoc(documentCartRef, { products: arrayUnion(newProduct)});
      //const res = await updateDoc(documentCartRef, newCart);
      console.log("Editado correctamente");
    } else {
      return { status: 404, data: "El Carrito NO existe" };
    }
  };

  return (
    <UsersContext.Provider
      value={{
        getUsers,
        users,
        setUsers,
        isLogged,
        userLogged,
        setIsLogged,
        login,
        addUser,
        handleLogin,
        createCart,
        addProductToCart,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
