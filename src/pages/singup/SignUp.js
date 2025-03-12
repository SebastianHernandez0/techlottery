import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../../sign-up/CustomIcons';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import {useNavigate} from 'react-router-dom';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AppAppBar from '../../components/AppAppBar';
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [telefonoError, setTelefonoError] = React.useState(false);
  const [telefonoErrorMessage, setTelefonoErrorMessage] = React.useState('');
  const [nombre, setNombre]= React.useState('');
  const [correo, setCorreo]= React.useState('');
  const [password, setPassword]= React.useState('');
  const [telefono, setTelefono]= React.useState('');
  const [instagram, setInstagram]= React.useState('');
  const [generalErrorMessage, setGeneralErrorMessage] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const Navigate= useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  
  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');
    const tel= document.getElementById('tel');
  

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Ingrese un correo valido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('El nombre es requerido');
      isValid = false;
    } else {
      setNameError(false); 
      setNameErrorMessage('');
    }
    if (!tel.value || tel.value.length < 9 || tel.value.length > 9) {
      console.log(tel.value.length);
      setTelefonoError(true);
      setTelefonoErrorMessage('El telefono debe ser de 8 digitos.');
      isValid = false;
    }else{
      setTelefonoError(false);
      setTelefonoErrorMessage('');
    }

    return isValid;
  };


  const handleSubmit = async (event) => {
      event.preventDefault();
      if (!validateInputs()) {
        return;
      }
    const userData = {
      nombre,
      correo,
      password,
      telefono: parseInt(telefono,10),
      instagram,
    };
    console.log("Sending data: ", userData);
    try{
      const response= await fetch('https://localhost:7262/api/Usuarios/Register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      if(response.ok){
        const data= await response.json();
        alert('Usuario registrado con exito',data)  
        setGeneralErrorMessage('');
        Navigate('/')
        
      }else{
        const error= await response.text();
        let errorMessage= "Error al registrar usuario: ";
        try {
          const errorJson= JSON.parse(error);
          console.log("Error json: ", errorJson.errors[0].errorMessage);
          return setGeneralErrorMessage(errorJson.errors[0].errorMessage);
          
        } catch (error) {
          console.log("Error parsing error: ", error);
        }
        setGeneralErrorMessage(error);
        console.log("Error response: ", error);

        
      }
    }catch(error){
      alert('Error: '+ error.message);
      console.log("Catch error: ", error);

  };
};

  return (
    <AppTheme {...props}>
      <AppAppBar />
      <CssBaseline enableColorScheme />
      <div>
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
     
      </div>
      
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Registrate
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Nombre</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                value={nombre}
                onChange={(e)=> setNombre(e.target.value)}
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Correo</FormLabel>
              <TextField
                value={correo}
                onChange={(e)=> setCorreo(e.target.value)}
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <TextField
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="telefono">Telefono</FormLabel>
              <div style={{display:'flex', gap: 5, alignItems: 'center'}}>
                <p>+56</p>
                <TextField
                value={telefono}
                onChange={(e)=> setTelefono(e.target.value)}
                required
                fullWidth
                name="tel"
                placeholder="12345678"
                type='number'
                id="tel"
                autoComplete="new-password"
                variant="outlined"
                error={telefonoError}
                helperText={telefonoErrorMessage}
                color={telefonoError ? 'error' : 'primary'}
              />
              </div>
              
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="instagram">Instagram  (No es necesario)</FormLabel>
              <TextField
                value={instagram}
                onChange={(e)=> setInstagram(e.target.value)}
                fullWidth
                name="instagram"
                placeholder="InserteIgcuandolohagamos"
                type="text"
                autoComplete="new-password"
                variant="outlined"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
              
            </Button>
            {generalErrorMessage && (
              <Typography color="error" sx={{ textAlign: 'center' }}>
                {generalErrorMessage}
              </Typography>
            )}
          </Box>
          <Divider>
            
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              Registrate con Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Registrate con Facebook
            </Button> */}
            <Typography sx={{ textAlign: 'center' }}>
              Ya tienes una cuenta?{' '}
              <Link
                href="/signin"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Inicia Sesión
               
              </Link>
              
              <br></br>
              <Link
              style={{marginTop: '2rem'}}
                href="/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Volver
               
              </Link>
              
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
