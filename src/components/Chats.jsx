import { Avatar, Box, TextField, Typography } from '@mui/material'
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };


  return (
    <Box>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) =>(
      <Box key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} 
        sx={{ display: 'flex', alignItems:'center', justifyContent: 'left', padding: '0.5rem', cursor: 'pointer'}}>
        <Avatar src={chat[1].userInfo.photoURL} sx={{ width: 40, height: 40}}/>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography sx={{ color: 'white', paddingLeft: '0.5rem'}}>{chat[1].userInfo.displayName}</Typography>
            <Typography variant="caption" sx={{color: '#c6c5c6', paddingLeft: '0.5rem'}}>{chat[1].lastMessage?.text}</Typography>
        </Box>
      </Box>
      ))}
    </Box>
  )
}

export default Chats