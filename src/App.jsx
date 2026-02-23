// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UserLogin from "./pages/auth/userLogin";
import VendorLogin from "./pages/auth/vendorLogin";
import UserRegister from "./pages/auth/userRegister";
import VendorRegister from "./pages/auth/vendorRegister";
import VendorCategory from "./pages/VendorCategory";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";

//vendor
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AddProduct from "./pages/vendor/addProduct";
import EditProduct from "./pages/vendor/editProduct";
import VendorStore from "./pages/vendor/vendorStore";

//navbar
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedVendorRoute from "./components/ProtectedVendorRoute";
// ADMIN
import AdminLogin from "./pages/admin/adminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

import ChangePass from "./pages/vendor/ChangePass";

import VendorProfile from "./pages/vendor/vendorProfil";


import UserProfile from "./pages/profilePages";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/vendor/profile/:id" element={<VendorProfile />} />

        <Route path="/vendor/:category" element={<VendorCategory />} />

        
        {/* USER AUTH */}
        <Route path="/login-user" element={<UserLogin />} />
        <Route path="/register-user" element={<UserRegister />} />

        {/* VENDOR AUTH */}
        <Route path="/login-vendor" element={<VendorLogin />} />
        <Route path="/register-vendor" element={<VendorRegister />} />

        {/* VENDOR PROTECTED */}
        <Route path="/vendor/dashboard" element={
          <ProtectedVendorRoute><VendorDashboard /></ProtectedVendorRoute>
        } />

        <Route path="/vendor/add-product" element={
        <ProtectedVendorRoute><AddProduct /></ProtectedVendorRoute>
        } />

        <Route path="/vendor/edit-product/:id" element={<ProtectedVendorRoute><EditProduct /></ProtectedVendorRoute>}
/>  

        <Route path="/vendor/profile" element={ <ProtectedVendorRoute> <ChangePass /></ProtectedVendorRoute>}/>

        <Route path="/vendor/store/:id" element={<VendorStore />} />

        {/* PRODUCT DETAILS */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* USER PROFILE */}
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/about" element={<About />} />
      
      
        {/* ADMIN */}
      <Route path="/login-admin" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />

      </Routes>

      <Footer />
    </Router>
  );
}
