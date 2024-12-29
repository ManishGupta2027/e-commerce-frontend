import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('/api/auth/register', { email, password, role });
      alert('Registration successful!');
    } catch (error) {
      alert('Error during registration');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
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
      <TextField
        label="Role (admin/user)"
        fullWidth
        margin="normal"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
};

export default Register;
