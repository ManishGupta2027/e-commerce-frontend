// AdminDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@mui/material";
import AdminHeader from "../admin/AdminHeader";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AdminHeader />
      <Container>
        <Typography variant="h3" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => navigate("/admin/products")}
            >
              Manage Products
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              onClick={() => navigate("/admin/orders")}
            >
              Manage Orders
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDashboard;