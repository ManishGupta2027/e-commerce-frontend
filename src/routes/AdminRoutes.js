import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "../pages/Admin";
import ManageProducts from "../components/admin/ManageProducts";
import ManageOrders from "../components/admin/ManageOrders";
import EditProduct from "../components/admin/EditProduct.js";
import CreateProduct from "../components/admin/CreateProduct.js";

// Protected route for admin-only access
// const AdminProtectedRoute = ({ children }) => {
//   const isAdmin = localStorage.getItem("role") === "admin"; // Example role check
//   return isAdmin ? children : <Navigate to="/login" />;
// };

const AdminRoutes = () => {
  return (
    //<AdminProtectedRoute>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/products" element={<ManageProducts />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/orders" element={<ManageOrders />} />
      </Routes>
    //</AdminProtectedRoute>
  );
};

export default AdminRoutes;
