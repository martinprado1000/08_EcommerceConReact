import { createContext, useContext, useState } from "react";

const AuthUserContext = createContext();

// Este es nuestro hook que exporta el contexto
export function useAuthContext() {
  return useContext(AuthUserContext);
}

// Provider
export function AuthUserProvider({ children }) {

  const [isLogged, setIsLogged] = useState(false);
  const [cartCount, setCartCount] = useState(0)
  // const [isAuth, setIsAuth] = useState(false);
  // const [userAuth, setUserAuth] = useState(false);
  // const [loading, setLoading] = useState(true);

  const handleLogin = ((value)=>{
    setIsLogged(value)
  })
  

  // const getUserAuth = async () => {
  //   try {
  //     let res = await fetch(`${URL_BACK}/api/profile`, {
  //       credentials: "include", // Permito que el backend cargue la cookie en el front
  //     });
  //     let responsBackend = await res.json();
  //     if (responsBackend.error) {
  //       setIsAuth(false);
  //       setUserAuth(false);
  //       setLoading(false);
  //       return;
  //     }

  //     setLoading(false);
  //     setIsAuth(true);
  //     setUserAuth(responsBackend.data);
  //     return;

  //   } catch (error) {
  //     setIsAuth(false);
  //     setUserAuth(false);
  //     setLoading(false);
  //     console.log(`Error inesperado en el sistema: ${error}`);
  //     window.location.href = "/fatalErrorPage";
  //     return;
  //   }
  // };

  return (
    <AuthUserContext.Provider value={{ isLogged, setIsLogged, handleLogin, cartCount }}>
      {children}
    </AuthUserContext.Provider>
  );
}
