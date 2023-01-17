import { Box, IconButton, Typography } from '@mui/material'
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Stack } from '@mui/system'
import React, { useContext } from 'react'
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext)
 
  return (
    <Box sx={{flex: 2}}>
      <Box className='chat-con' sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#5f5b8f',
        height: '10%',
        padding: '0 10px',
        color: 'white',
      }}>
        <Typography>{data.user?.displayName}</Typography>
        <Stack direction="row" spacing={2}>
          <IconButton color="inherit" sx={{ padding: '0'}}>
            <VideocamIcon />
          </IconButton>
          <IconButton color="inherit"  sx={{ padding: '0'}}>
            <PersonAddAlt1Icon />
          </IconButton>
          <IconButton color="inherit"  sx={{ padding: '0'}}>
            <MoreHorizIcon />
          </IconButton>
        </Stack>
      </Box> 
      <Messages/>
      <Input/>
    </Box>
  )
}

export default Chat