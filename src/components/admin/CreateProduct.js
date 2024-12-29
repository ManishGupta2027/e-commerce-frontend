// CreateProduct.js

import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${BASE_URL}/api/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={productData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={productData.stock}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Category ID"
          name="categoryId"
          type="number"
          value={productData.categoryId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Create Product
        </Button>
      </Box>
    </Container>
  );
};

export default CreateProduct;
