// components/admin/EditProduct.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch product details by ID
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:7060/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details");
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Category ID"
          name="categoryId"
          type="number"
          value={product.categoryId}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditProduct;
