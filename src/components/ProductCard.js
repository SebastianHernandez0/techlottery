import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {

  const navigate = useNavigate();


  const handleClick =()=>{
    navigate(`/rifas/${product.sorteoId}`);
  }


  return (
    <>
   
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      > <ButtonBase sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
      onClick={handleClick}>
        <CardMedia
          sx={{ height: "100%", objectFit: "contain" }}
          component="img"
          image={product.imagen}
          alt={product.nombre}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {product.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.precioBoletos}
          </Typography>
        </CardContent>
        <CardActions>
          <Button style={{ textAlign: "center", margin: "auto",  }} size="small">
            Ver más
          </Button>
        </CardActions>
        </ButtonBase>
      </Card>

    </>
  );
}
