import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Avatar, Menu, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Get user email from localStorage
  const userEmail = localStorage.getItem('userEmail');
  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : '';

  // Handle menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.clear(); // Clear user info from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            MyShop
          </Link>
        </Typography>

        {!userEmail ? (
          <>
            <Button color="inherit">
              <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                Login
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
                Register
              </Link>
            </Button>
          </>
        ) : (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <Avatar>{firstLetter}</Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </>
        )}

        <IconButton color="inherit">
          <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
