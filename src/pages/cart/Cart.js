import * as React from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemAvatar, Avatar, Divider} from '@mui/material';
import { useCart } from '../../context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AppAppBar from '../../components/AppAppBar';
import AppTheme from '../../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';





export default function Cart(props) {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const Navigate = useNavigate();

  const handleRemoveFromCart = (index) => {
    removeFromCart(index);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleIncreaseQuantity = (productId) => {
    updateQuantity(productId, 1);
   
  }

  const handleDecreaseQuantity = (productId) => {
    updateQuantity(productId, -1);
  }

  const total= cart.reduce((acc, product) => acc + product.precioBoletos * product.quantity , 0);
  
  const handleCheckout= ()=>{
    Navigate('/pago');
  }

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
              <React.Fragment key={product.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={product.imagen} ></Avatar>
                </ListItemAvatar> 
                <ListItemText
                  primary={product.nombre}
                  secondary={`Precio: $${product.precioBoletos} x ${product.quantity}`}
                />
                <ListItemSecondaryAction style={{display: 'flex', flexDirection: 'row', gap: 20}}>
                <IconButton edge="end" aria-label="remove" onClick={() => handleDecreaseQuantity(product.sorteoId)}>
                        <RemoveIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="add" onClick={() => handleIncreaseQuantity(product.sorteoId)}>
                        <AddIcon />
                      </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                
              </ListItem>
              <Divider variant="inset" component="li" />
              </React.Fragment>
              
            ))}
            
          </List>
        )}
        {cart.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" component="div" gutterBottom>
                Total: ${total}
              </Typography>
            <Button variant="contained" color="primary" onClick={handleClearCart}>
              Vaciar Carrito
            </Button>
            <Button variant="contained" color="secondary" sx={{ ml: 2 }} onClick={handleCheckout}>
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