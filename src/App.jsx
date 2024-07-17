import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import ProductPage from "./pages/productPage";
import ErrorPage from "./pages/errorPage";
import Test from "./pages/test";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/category/:category" element={<HomePage />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route> 
          <Route path="/test" element={<Test />}></Route>
          <Route path="/errorPage" element={<ErrorPage />}></Route>
          <Route path="/*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
