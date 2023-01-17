import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);


  return (
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#2f2c53',
      height: '10%',
      padding: '0 10px',
      color: 'white',
    }}>
      <Typography >Burble</Typography>
      <Stack className='user' direction='row' spacing={1}>
        <Avatar src={currentUser.photoURL} sx={{ width: 26, height: 26 }}></Avatar>
        <Typography>{currentUser.displayName}</Typography>
        <Button size='small' color="inherit" onClick={() => signOut(auth)}>
          <Typography variant='caption'>Logout</Typography>
        </Button>
      </Stack>
    </Box>
  )
}

export default Navbar