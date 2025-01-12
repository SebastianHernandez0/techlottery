import * as React from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { useCart } from '../../context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AppAppBar from '../../components/AppAppBar';
import AppTheme from '../../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { props } from '../../shared-theme/AppTheme';




export default function Cart(props) {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleRemoveFromCart = (index) => {
    removeFromCart(index);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container id="features" sx={{ py: { xs: 8, sm: 16 }, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Carrito de Compras
        </Typography>
        {cart.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            Tu carrito está vacío.
          </Typography>
        ) : (
          <List>
            {cart.map((product, index) => (
              <ListItem key={product.id}>
                <ListItemText
                  primary={product.nombre}
                  secondary={`Precio: $${product.precioBoletos}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        {cart.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleClearCart}>
              Vaciar Carrito
            </Button>
            <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
              Comprar
            </Button>
          </Box>
        )}
      </Box>
    </Container>
    </Container>
    </AppTheme>
    
  );
}