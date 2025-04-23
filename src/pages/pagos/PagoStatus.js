import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { useCart } from '../../context/CartContext';
import AppAppBar from '../../components/AppAppBar';
import AppTheme from '../../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';

function PagoStatus(props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    const verificarPago = async () => {
      try {
        const token = localStorage.getItem('token');
        const pagoId = localStorage.getItem('lastPaymentId');
        
        if (!token || !pagoId) {
          throw new Error('Información de pago no encontrada');
        }

        const response = await fetch(`https://localhost:7262/api/pagos/verificar/${pagoId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al verificar el estado del pago');
        }

        const data = await response.json();
        
        if (data.estadoPago === 'Completado') {
          setStatus('success');
          clearCart(); // Limpiar el carrito solo si el pago fue exitoso
          localStorage.removeItem('lastPaymentId'); // Limpiar el ID de pago
        } else if (data.estadoPago === 'Pendiente') {
          setStatus('pending');
        } else {
          setStatus('error');
          setError(data.mensaje || 'El pago no pudo ser completado');
        }
      } catch (err) {
        setStatus('error');
        setError(err.message);
      }
    };

    verificarPago();
  }, [clearCart]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        );
      
      case 'success':
        return (
          <>
            <Alert severity="success" sx={{ mb: 4 }}>
              ¡Tu pago ha sido procesado exitosamente!
            </Alert>
            <Typography variant="body1" paragraph>
              Hemos enviado un correo electrónico con los detalles de tu compra.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/rifas')}
            >
              Ver Más Sorteos
            </Button>
          </>
        );
      
      case 'pending':
        return (
          <>
            <Alert severity="info" sx={{ mb: 4 }}>
              Tu pago está siendo procesado
            </Alert>
            <Typography variant="body1" paragraph>
              Por favor, espera mientras confirmamos tu pago.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
            >
              Actualizar Estado
            </Button>
          </>
        );
      
      case 'error':
        return (
          <>
            <Alert severity="error" sx={{ mb: 4 }}>
              {error || 'Hubo un error al procesar tu pago'}
            </Alert>
            <Typography variant="body1" paragraph>
              Por favor, intenta nuevamente o contacta a soporte si el problema persiste.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/cart')}
              >
                Volver al Carrito
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/contact')}
              >
                Contactar Soporte
              </Button>
            </Box>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container sx={{ py: { xs: 8, sm: 16 } }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Estado del Pago
          </Typography>
          {renderContent()}
        </Box>
      </Container>
    </AppTheme>
  );
}

export default PagoStatus;