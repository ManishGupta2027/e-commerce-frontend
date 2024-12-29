import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode || !shippingInfo.country) {
      alert('Please fill in all the shipping details.');
      return;
    }
    const userId = localStorage.getItem("userId");
    const orderData = {
      userId: userId, // Replace with actual user ID from authentication
      orderItems: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price * item.quantity,
      })),
      shippingInfo,
      totalAmount,
    };
//console.log(orderData)
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/orders`, orderData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(clearCart());
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place the order. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Shipping Info */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="City"
              name="city"
              value={shippingInfo.city}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={shippingInfo.postalCode}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={shippingInfo.country}
              onChange={handleInputChange}
              margin="normal"
            />
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Total: ${totalAmount.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default Checkout;
