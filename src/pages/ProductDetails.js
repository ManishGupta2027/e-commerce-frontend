import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Container, CircularProgress, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice'; // Import the cart slice
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Quantity state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:7060/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        alert('Product not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (quantity < 1 || quantity > product.stock) {
      alert('Invalid quantity');
      return;
    }
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: parseInt(quantity, 10),
      })
    );
    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h3">{product.name}</Typography>
      <Typography variant="h5">Price: ${product.price}</Typography>
      <Typography variant="body1">Description: {product.description}</Typography>
      <Typography variant="body1">Stock: {product.stock}</Typography>
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        inputProps={{ min: 1, max: product.stock }}
        style={{ margin: '1rem 0' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </Container>
  );
};

export default ProductDetails;
