import { Box } from '@mui/material'
import React from 'react'
import Search from './Search'
import Navbar from './Navbar'
import Chats from './Chats'

const SideBar = () => {
  return (
    <Box sx={{
      flex: 1,
      backgroundColor: '#3e3c62',
      
    }}>
      <Navbar/>
      <Search/>
      <Chats/>
    </Box>
  )
}

export default SideBar