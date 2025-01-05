import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../../components/AppAppBar';
import Footer from '../../components/Footer';
import AppTheme from '../../shared-theme/AppTheme';
import { Container, Typography, Box, TextField, Button, Grid, Alert  } from '@mui/material';


export default function AddSorteo(props) {
  const navigate = useNavigate();
  const [nombre, setNombre] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [precioBoletos, setPrecioBoletos] = React.useState('');
  const [fechaInicio, setFechaInicio] = React.useState('');
  const [fechaFin, setFechaFin] = React.useState('');
  const [boletosTotales, setBoletosTotales] = React.useState('');
  const [imagen, setImagen] = React.useState('');
    const [token, setToken] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
  React.useEffect(() => {
    const rol = localStorage.getItem('rol');
    const token= localStorage.getItem('token');
    setToken(token);
    if (rol !== 'Admin') {
      navigate('/');
    }

}, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sorteoData = {
      nombre,
      descripcion,
      precioBoletos: parseFloat(precioBoletos),
      fechaInicio,
      fechaFin,
      boletosTotales: parseInt(boletosTotales, 10),
      imagen,
    };

    try {
      const response = await fetch('https://localhost:7262/api/Sorteos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(sorteoData),
      });

      if (response.ok) {
        setSuccessMessage('Sorteo agregado con éxito');
        setTimeout(() => {
            setSuccessMessage('');
            navigate('/admin');
        }, 3000);
        
        
      } else {
        const errorText = await response.text();
        alert('Error al agregar sorteo: ' + errorText);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container id="features" sx={{ py: { xs: 8, sm: 16 }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Box sx={{ width: { sm: '100%', md: '100%' }, textAlign: 'center' }}>
          <Typography component="h2" variant="h4" gutterBottom>
            Sorteos
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Agregar Sorteos
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                fullWidth
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                fullWidth
                rows={4}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Precio de Boletos"
                type="number"
                fullWidth
                value={precioBoletos}
                onChange={(e) => setPrecioBoletos(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Fecha de Inicio"
                type="datetime-local"
                fullWidth
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Fecha de Fin"
                type="datetime-local"
                fullWidth
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Boletos Totales"
                type="number"
                fullWidth
                value={boletosTotales}
                onChange={(e) => setBoletosTotales(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="URL de la Imagen"
                fullWidth
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Agregar Sorteo
              </Button>
            </Grid>
          </Grid>
        </Box>
        {successMessage && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="success">{successMessage}</Alert>
          </Box>
        )}
        
      </Container>
    </AppTheme>
  );
}