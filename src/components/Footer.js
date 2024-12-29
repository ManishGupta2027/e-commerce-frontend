import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', p: 2, mt: 4, color: 'white' }} component="footer">
      <Typography variant="body1" align="center">
        © 2024 MyShop. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
