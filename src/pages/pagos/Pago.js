import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert
} from '@mui/material';
import { useCart } from '../../context/CartContext';
import AppAppBar from '../../components/AppAppBar';
import AppTheme from '../../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';

function Pago(props) {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calcular el total del carrito
  const total = cart.reduce((sum, product) => 
    sum + (product.precioBoletos * product.quantity), 0
  );

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
        setError('Debes iniciar sesión para realizar la compra');
        navigate('/signin');
        return;
      }

      const pagoDetalles = cart.map(product => ({
        sorteoId: product.sorteoId,
        cantidad: product.quantity,
        monto: product.precioBoletos * product.quantity
      }));

      console.log('Enviando datos de pago:', { userId, pagoDetalles });

      const response = await fetch('https://localhost:7262/api/pagos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, pagoDetalles })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al procesar el pago');
      }

      const data = await response.json();
      
      // Guardar el ID de pago en localStorage para verificación posterior
      localStorage.setItem('lastPaymentId', data.pagoId);
      
      if (data.Url) {
        window.location.href = data.Url;
      } else {
        throw new Error('No se recibió la URL de pago');
      }
      
    } catch (err) {
      setError(err.message);
      console.error('Error en el checkout:', err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Container sx={{ py: { xs: 8, sm: 16 } }}>
          <Alert severity="info">
            Tu carrito está vacío. Por favor, agrega algunos boletos antes de proceder al pago.
          </Alert>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/rifas')}
            sx={{ mt: 2 }}
          >
            Ver Sorteos Disponibles
          </Button>
        </Container>
      </AppTheme>
    );
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container sx={{ py: { xs: 8, sm: 16 } }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Resumen de Compra
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sorteo</TableCell>
                <TableCell align="right">Precio por Boleto</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((product) => (
                <TableRow key={product.sorteoId}>
                  <TableCell>{product.nombre}</TableCell>
                  <TableCell align="right">${product.precioBoletos}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">
                    ${product.precioBoletos * product.quantity}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <Typography variant="h6">Total:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">${total}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/cart')}
            disabled={loading}
          >
            Volver al Carrito
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            disabled={loading}
            sx={{ minWidth: 200 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Proceder al Pago'
            )}
          </Button>
        </Box>
      </Container>
    </AppTheme>
  );
}

export default Pago;