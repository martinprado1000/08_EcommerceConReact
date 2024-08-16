import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import ProductPage from "./pages/productPage";
import Test from "./pages/test";
import ErrorPage from "./pages/errorPage";
import RegisterPage from "./pages/registerPage";
import CartPage from "./pages/cartPage";

import { UsersProvider } from "./contexts/UsersContext";
import { ProductsProvider } from "./contexts/ProductsContext";

function App() {
  return (
    <>
    <BrowserRouter>
        <UsersProvider>
          <ProductsProvider>
                <Routes>
                  <Route path="/" element={<HomePage />}></Route>
                  <Route path="/home" element={<HomePage />}></Route>
                  <Route path="/category/:category" element={<HomePage />}></Route>
                  <Route path="/product/:id" element={<ProductPage />}></Route>
                  <Route path="/register" element={<RegisterPage />}></Route>
                  <Route path="/cart" element={<CartPage />}></Route>
                  <Route path="/errorPage" element={<ErrorPage />}></Route>
                  <Route path="/test" element={<Test />}></Route>
                  <Route path="/*" element={<ErrorPage />}></Route>
                </Routes>
          </ProductsProvider>
        </UsersProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
