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
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { dbFirestore } from "../db/db.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const UsersContext = createContext();

// Este es nuestro hook que exporta el contexto
export function useUsersContext() {
  return useContext(UsersContext);
}

// Provider
export function UsersProvider({ children }) {
  const navigate = useNavigate();

  const [users, setUsers] = useState({});
  //const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [userLogged, setUserLogged] = useState({});
  const [userCart, setUserCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    getTotalAmount();
  }, [userLogged, totalAmount]);

  const handleLogin = (value) => {
    setIsLogged(value);
    setUserLogged({});
    navigate("/");
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
        console.log("no hay usuarios registrados");
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
      const user = snapshot.docs.map((doc) => ({
        //id: doc.id, doc: doc.data()
        id: doc.id,
        ...doc.data(), // Lo hago de esta forma para que la data no quede dentro de .doc
      }));
      const pass = user[0]?.password;
      if (snapshot.size !== 0) {
        const userId = snapshot.docs[0].id;
        return { status: true, data: userId, pass };
      } else {
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
    };
    try {
      const userCart = await addDoc(collectionCartsRef, newCart);
      if (userCart.id) {
        return {
          status: 200,
          data: userCart.id,
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
          // Si se creo el usuario creo el carrito
          const cart = await createCart(res.id); // Creo el carrito para el nuevo usuario
          setIsLogged(true);
          setUserLogged({
            email: newUser.email,
            id: res.id,
            idCart: cart.data,
          });
          setTotalAmount(0);
          return {
            status: 200,
            data: "OK",
          };
        } else {
          //setIsLogged(false);
          //setUserLogged({});
          return {
            status: 500,
            data: "Error al crear el carrito",
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
      let userId = await getUserByEmail(user.email);
      if (userId.status === true) {
        if (user.password === userId.pass) {
          let cart = await getCartByOwnerId(userId.data);
          cart = cart.data[0];
          setIsLogged(true);
          setUserLogged({
            email: user.email,
            id: userId.data,
            idCart: cart.idCart,
          });
          getTotalAmount();
          return {
            status: 200,
            data: "Usuario Logueado satisfactoriamente",
          };
        } else {
          console.log("Password incorrecto");
          return {
            status: 401,
            data: "Usuario o password incorrectos",
          };
        }
      }
      if (userId.status == false) {
        setIsLogged(false);
        setUserLogged({});
        console.log("Usuario incorrecto");
        return {
          status: 401,
          data: "Usuario o password incorrectos",
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

  const getCartByOwnerId = async (ownerId) => {
    try {
      const q = query(collectionCartsRef, where("owner", "==", ownerId));
      const snapshot = await getDocs(q);
      if (snapshot.size !== 0) {
        const cart = snapshot.docs.map((doc) => {
          return { idCart: doc.id, ...doc.data() };
        });
        setUserCart(cart);
        return { status: true, data: cart };
      } else {
        console.log("El Carrito NO existe");
        return { status: false, data: "El Carrito NO existe" };
      }
    } catch (error) {
      return { status: 500, data: "Error del servidor" };
      //navigate("/fatalErrorPage");
      //return;
    }
  };

  const getTotalAmount = async () => {
    const res = await getCartByOwnerId(userLogged.id);
    const cart2 = res.data[0];
    const totalQuantity = cart2.products?.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
    setTotalAmount(totalQuantity);
    return totalQuantity;
  };

  const addProductToCart = async (newQuantity, productId) => {
    const documentRef = doc(dbFirestore, "carts", userLogged.idCart);
    const cartUser = await getDoc(documentRef); // Obtengo el carrito del usuario por el id del carrito
    if (cartUser.exists()) {
      // Si el carrito existe obtengo los productos
      const data = cartUser.data();
      const currentProducts = data.products;
      const productExist = currentProducts.some(
        (item) => item.product == productId
      );

      if (productExist) {
        // Si existe el producto lo actualizo
        const updatedProducts = currentProducts.map((item) => {
          if (item.product === productId) {
            // Actualizar solo la cantidad
            return { ...item, quantity: item.quantity + newQuantity };
          }
          return item; // Retorno el mismo producto
        });
        await updateDoc(documentRef, { products: updatedProducts });
        getTotalAmount();
        console.log("Cantidad actualizada correctamente");
      } else {
        // Como no existe el producto lo agrego
        const newProduct = { product: productId, quantity: newQuantity };
        await updateDoc(documentRef, { products: arrayUnion(newProduct) });
        getTotalAmount();
        console.log("Producto agregado correctamente");
      }
    } else {
      console.log("el carrito no existe");
      return { status: 500, data: "El Carrito NO existe, error del sistema" };
    }
  };

  const deleteProductsCart = async () => {
    const deletedCart = {
      owner: userLogged.id,
      products: [],
    };
    try {
      const documentRef = doc(dbFirestore, "carts", userLogged.idCart);
      await setDoc(documentRef, deletedCart);
      Swal.fire({
        title: "Su compra se realizó correctamente",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
      });
      navigate("/");
      return {
        status: 200,
      };
    } catch (e) {
      return {
        status: 500,
        data: `Error en el sistema: ${e}`,
      };
    }
  };

  const deleteOneProductsCart = async (productId) => {
    try {
      const cartId = userCart[0].idCart;

      const cartRef = doc(dbFirestore, "carts", cartId);
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        const updatedProducts = cartData.products.filter(
          (item) => item.product !== productId
        );
        await updateDoc(cartRef, { products: updatedProducts });
        Swal.fire({
          title: "Producto eliminado correctamente",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        });
        navigate("/");
        console.log("Producto eliminado correctamente");
      } else {
        console.log("El carrito no existe");
      }
    } catch (e) {
      return {
        status: 500,
        data: `Error en el sistema: ${e}`,
      };
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
        userCart,
        addProductToCart,
        getTotalAmount,
        totalAmount,
        deleteProductsCart,
        deleteOneProductsCart,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
