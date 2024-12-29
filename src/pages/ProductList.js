import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Container,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch(); // Redux dispatch
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Quantity state
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://localhost:7060/api/Products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);
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

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Product Catalog
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography>Price: ${product.price}</Typography>
                <Typography>Stock: {product.stock}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Details
                </Button>
                  <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
