import * as React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import AppTheme from "../../shared-theme/AppTheme";
import AppAppBar from "../../components/AppAppBar";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { sorteoId } = useParams();
  const [product, setProduct] = React.useState(null);
  const { addToCart } = useCart();

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://localhost:7262/api/Sorteos/${sorteoId}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [sorteoId]);

  if (!product) {
    return <Typography>Cargando...</Typography>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    console.log("Product added to cart:", product);
   
  };

  return (
    <>
      <AppTheme>
        <AppAppBar />
        <Container
          sx={{
            py: { xs: 8, sm: 16 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ my: 2 }} variant="h1" component="h1" gutterBottom>
            {product.nombre}
          </Typography>
          <Box
            sx={{
              my: 4,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <img
              src={product.imagen}
              alt={product.nombre}
              style={{ width: "50%", height: "auto" }}
            />
            <div>
              <Typography variant="h6" color="text.secondary" paragraph>
                {product.descripcion}
              </Typography>
              <Typography variant="h5" color="text.primary">
                Precio: ${product.precioBoletos}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
              >
                Comprar
              </Button>
            </div>
          </Box>
        </Container>
      </AppTheme>
    </>
  );
}
