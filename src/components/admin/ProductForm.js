// src/components/admin/ProductForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: 1,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch product details for editing
      axios
        .get(`https://localhost:7060/api/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = id
      ? axios.put(`https://localhost:7060/api/products/${id}`, product) // Update
      : axios.post("https://localhost:7060/api/products", product); // Create

    apiCall
      .then(() => navigate("/admin/products"))
      .catch((error) => console.error("Error saving product:", error));
  };

  return (
    <div>
      <h2>{id ? "Edit Product" : "Create Product"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category ID</label>
          <input
            type="number"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default ProductForm;
