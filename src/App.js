import './App.css';
import RegisterPage from "./pages/profile/RegisterPage";
import LoginPage from "./pages/profile/LoginPage";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import ProductDetails from './pages/ProductDetails';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import NavBar from './components/NavBar';
import Foot from './components/Foot';
import OrderDetails from './pages/OrderDetails';
import ChangePassword from './pages/profile/ChangePassword';
import ForgetPassword from './pages/profile/ForgetPassword';
import UpdateProfile from './pages/profile/UpdateProfile';
import UserProfile from './pages/profile/UserProfile';
import Dashboard from './pages/admin/Dashboard';
import AllProductDetails from './pages/admin/AllProductDetails';
import OrderIdDetails from './pages/admin/OrderIdDetails';
import NewProduct from './pages/admin/NewProduct';
import UpdateProduct from './pages/admin/UpdateProduct';
import AllUserDetails from './pages/admin/AllUserDetails';

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <ToastContainer theme='dark' position='top-center' />
          <NavBar cartItems={cartItems} />
          <Routes>
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Home />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/product/:id" element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/orderdetails" element={<OrderDetails />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/changepassword" element={<ChangePassword />} />
            <Route path="/profile/updateprofile" element={<UpdateProfile />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/allproductdetails" element={<AllProductDetails />} />
            <Route path="/admin/newproduct" element={<NewProduct />} />
            <Route path="/admin/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="/admin/alluserdetails" element={<AllUserDetails />} />
            <Route path="/admin/orderiddetails/:id" element={<OrderIdDetails />} />
          </Routes>
          <Foot />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
