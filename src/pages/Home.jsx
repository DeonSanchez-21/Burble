import { Box, Container } from '@mui/material'
import React from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'


const Home = () => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#a8bcff',
    }}>
      <Box sx={{
        width: '70%',
        height: '80vh',
        border: '1px solid white',
        borderRadius: '12px',
        display: 'flex',
        overflow: 'hidden',
      }}>
        <Sidebar/>
        <Chat/>
      </Box>
    </Box>
  )
}

export default Home