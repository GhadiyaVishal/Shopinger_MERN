import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login/Login";
import UpdateData from "./AppPages/UpdateData";
import Register from "./pages/Login/Register";
import Homepage from "./AppPages/Homepage";
import Success from "./AppPages/Success";
import ProductList from "./AppPages/ProductList";
import Product from "./AppPages/Product";
import Cart from "./AppPages/Cart";
import Header from "./AppPages/Header";
import Footer from "./component/Footer";
import { useSelector } from "react-redux";
import CartEmpty from "./AppPages/CartEmpty";
import FooterCode from "./component/footer/FooterCode";

function App() {
  // const user = true
  const user = useSelector(state => state.user.currentUser);
  const products = useSelector(state => state.cart.products);
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            theme: {
              primary: "#3e3e7c",
            },
          },
        }}
      ></Toaster>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route
            path="/productlist/:category"
            element={<ProductList />}
          ></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route
            path="/cart"
            element={products.length == 0 ? <CartEmpty /> : <Cart />}
          ></Route>
          <Route path="/cartemty" element={<CartEmpty />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          ></Route>
          {/* <Route path="/login">{user ? <Navigate to="/" /> : <Login />}</Route> */}
          {/* <Route path="/register">
            {user ? <Navigate to="/" /> : <Register />}
          </Route> */}
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          ></Route>
          <Route path="/update" element={<UpdateData />}></Route>
        </Routes>
        <FooterCode />
      </BrowserRouter>
    </>
  );
}

export default App;
// element={<Login />}
// element={<Register />}
