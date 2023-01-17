import React, { useState } from 'react';
import { Container, Typography, TextField, Input, Button, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { doc, setDoc } from "firebase/firestore"; 
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

import '../app.css';

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[3].value;
    const file = e.target[2].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

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
        <Typography variant='caption' sx={{paddingTop: '0.5rem'}}>Register</Typography>
        <form className='form' onSubmit={handleSubmit}>
          <TextField type='text'  label="display name" variant="standard" sx={{
            width: '250px', marginBottom: '0.5rem'
          }}/>
          <TextField type='email' label="email" variant="standard" sx={{ m:1,
            width: '250px'
          }}/>
          <input style={{ display: "none" }} type="file" id='file'/>
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
          <label htmlFor="file" className='add-img' >
            <AddPhotoAlternateOutlinedIcon/>
            <Typography sx={{
            paddingLeft: '0.5rem', cursor: 'pointer'
            }}> add an avatar</Typography>
          </label>
          <Button sx={{
            width: '250px',
            m: 1
          }} variant='contained' type='submit'>Sign Up</Button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <Typography>You do have an account? <Link to='/login'>Login</Link> </Typography>
      </Container>
    </Box>
  )
}

export default Register