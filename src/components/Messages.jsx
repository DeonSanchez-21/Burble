import { Box } from '@mui/system';
import { doc, onSnapshot } from "firebase/firestore";
import React,  { useContext, useEffect, useState }  from 'react';
import { ChatContext } from '../context/ChatContext';
import Message from './Message';
import { db } from "../firebase";

const Messages = () => {
  const[messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)

  return (
    <Box className='scrollbar' sx={{ 
      bgcolor: "#dddcf7", 
      padding: '0.5rem',
      height: '80%',
      overflowY: 'scroll',
      sideBar: 'hide'}}>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </Box>
  )
}

export default Messages