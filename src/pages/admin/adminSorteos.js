import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppAppBar from "../../components/AppAppBar";
import Footer from "../../components/Footer";
import AppTheme from "../../shared-theme/AppTheme";
import { Button, Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Features from "../../components/Features";

export default function AdminSorteos(props) {

    const navigate = useNavigate();

    React.useEffect(() => {
        const rol= localStorage.getItem('rol');
        if(rol!=="Admin"){
            navigate('/');
        }
    },[navigate]);

    return(

        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <AppAppBar />
            <Container id="features" sx={{ py: { xs: 8, sm: 16 }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap:3 }}>
                <Box sx={{ width: { sm: '100%', md: '100%' }, textAlign: 'center' }}>
                    <Typography
                        component="h2"
                        variant="h4"
                        gutterBottom
                    >
                        Sorteos
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Administra los sorteos de la plataforma.
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row-reverse' },
                        gap: 2,
                    }}
                ></Box>
                <div style={{display: 'flex', justifyContent: 'center', gap: 15}}>
                    <Button variant="contained" color="primary" href="/admin/agregarSorteo">Nuevo Sorteo</Button>
                    
                </div>
            </Container>

        </AppTheme>
    )



}