import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { useCart } from '../../context/CartContext';
import AppAppBar from '../../components/AppAppBar';
import AppTheme from '../../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';

export default function Pago(props) {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Asegúrate de tener el userId disponible
    const pagoDetalles = cart.map(product => ({
      sorteoId: product.id,
      cantidad: product.quantity,
      monto: product.precioBoletos * product.quantity
    }));

    const response = await fetch('https://localhost:7262/api/pagos/iniciar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId, pagoDetalles })
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = data.Url; // Redirigir a la URL de Webpay
    } else {
      alert('Error al iniciar el pago');
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container id="features" sx={{ py: { xs: 8, sm: 16 }, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Pago
          </Typography>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Proceder al Pago
          </Button>
        </Box>
      </Container>
    </AppTheme>
  );
}