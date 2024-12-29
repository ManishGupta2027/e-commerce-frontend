import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Use named import

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
      const token = response.data.token;

      // Decode the token to extract user details
      const decoded = jwtDecode(token);
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', decoded.sub);
      localStorage.setItem('userId', decoded.jti);

      alert('Login successful!');
      window.location.href = '/'; // Redirect to the home page
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default Login;
