// ManageProducts.js
import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://localhost:7060/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`https://localhost:7060/api/products/${id}`)
      .then(() => setProducts(products.filter(product => product.id !== id)))
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <Button variant="contained" color="primary" onClick={() => navigate('/admin/products/create')}>
        Add Product
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleEdit(product.id)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageProducts;