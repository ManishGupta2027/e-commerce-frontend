import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h5" gutterBottom textAlign={'center'}>
          Your cart is empty.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.name}
                secondary={`Price: $${item.price} | Quantity: ${item.quantity}`}
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleRemove(item.id)}
                sx={{ mx: 1 }}
              >
                Remove
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity === 1}
              >
                -
              </Button>
              <Typography variant="body1" sx={{ mx: 1 }}>
                {item.quantity}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Total: ${totalAmount.toFixed(2)}</Typography>
      </Paper>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            fullWidth
            color="primary"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => navigate('/checkout')}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
