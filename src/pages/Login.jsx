import React from 'react';
import { Container, Typography, TextField, Input, Button, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import '../app.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigate('/')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#a8bcff',
    }}>
      <Container sx={{
        flexDirection: 'column',
        width: '400px',
        display: 'flex',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '12px',
    }}>
        <Typography variant='h4'>Burble</Typography>
        <Typography variant='caption' sx={{paddingTop: '0.5rem'}}>login</Typography>
        <form className='form' onSubmit={handleSubmit}>
          <TextField type='email' id="outlined-basic" label="email" variant="standard" sx={{ m:1,
            width: '250px'
          }}/>
           <FormControl sx={{ m: 1, width: '250px' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
          
          <Button sx={{
            width: '250px',
            m: 3
          }} variant='contained' type='submit'>Login</Button>
        </form>
        <Typography>You dont have an account? <Link to='/register'>Register</Link> </Typography>
      </Container>
    </Box>
  )
}

export default Login