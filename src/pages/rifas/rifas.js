import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppAppBar from "../../components/AppAppBar";
import Footer from "../../components/Footer";
import AppTheme from "../../shared-theme/AppTheme";
import { Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { Container, Typography, Box } from "@mui/material";


export default function Rifas(props) {
  const [products, setProducts] = React.useState([]);
 

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:7262/api/Sorteos');
        const data = await response.json();
        setProducts(data);
        console.log(products)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container id="features" sx={{ py: { xs: 8, sm: 16 }, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{ width: { sm: '100%', md: '100%' }, textAlign: 'center' }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
        >
          Rifas
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Participa en nuestras rifas y gana increíbles premios.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          gap: 2,
        }}
      ></Box>
      <div>
        <Grid container spacing={2} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          {products.map((product)=>(
            <Grid   item xs={10} sm={10} md={10} lg={6} key={product.sorteoId}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <Divider sx={{my:4}} />
        <Footer />
      </div>
    </Container>
    </AppTheme>
  );
}
