import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";
import UserInfo from "./pages/UserInfo";
import About from "./pages/About";
import Header from "./component/Header";
// eslint-disable-next-line
import Footer from "./pages/parts/Footer";
import PrivateRoute from "./component/PrivateRouter";
import AllProducts from "./pages/Products/AllProducts";
import ProductInfo from "./pages/Products/ProductInfo";
import Cart from "./pages/Products/Cart";

function App() {
  // eslint-disable-next-line
  let { loggedin } = useSelector((state) => state.data);
  const checkLoggedin = localStorage.getItem("userData");
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        {checkLoggedin ? <Header /> : ""}
        <Routes>
          <>
            <Route exact path="/" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/home" element={<Home />} />
              <Route path="/addUser" element={<AddEditUser />} />
              <Route path="/editUser/:id" element={<AddEditUser />} />
              <Route path="/userInfo/:id" element={<UserInfo />} />
              <Route path="/about" element={<About />} />
              <Route path="/allProducts" element={<AllProducts />} />
              <Route path="/productInfo/:id" element={<ProductInfo />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </>
        </Routes>
        {/* {checkLoggedin ? <Footer /> : ""} */}
      </div>
    </BrowserRouter>
  );
}

export default App;
