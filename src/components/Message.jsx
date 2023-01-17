import { Avatar, Box, Typography } from '@mui/material'
import React,  { useContext, useEffect, useRef }  from 'react';
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <Box ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`} sx={{ 
      display: 'flex',
      alignItems: 'center',
      padding: '5px 2px',
      }}>
      <Box> 
        <Avatar className='avatar' src={ message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL } sx={{ width: 24, height: 24 }}/>
        <Typography variant='caption'>just now</Typography>
      </Box>
      <Box className={`${message.senderId === currentUser.uid ? "you" : "other"}`}>
        <Typography sx={{
          fontSize: '0.8rem',
        }}>{message.text}</Typography>
        {message.img && <img src={message.img} alt="" />}
      </Box>
    </Box>
  )
}

export default Message