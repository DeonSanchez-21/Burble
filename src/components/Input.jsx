import { Box, Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
  } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
  
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
  
    const handleSend = async () => {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);
  
        uploadTask.on(
          (error) => {
            //TODO:Handle Error
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
  
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      setText("");
      setImg(null);
    };
  return (
    <Box sx={{ 
        bgcolor: 'white',
        height: "10%", 
    }}>
        <Paper component="form"
            sx={{ p: '2px 10px',
            display: 'flex',
            alignItems: 'center',
            width: "100%",
            height: "100%",}}
        >
            <InputBase
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend()
                  }
                }}
                value={text}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Type Something..."
                inputProps={{ 'aria-label': 'Type Something...' }}
            />
            <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
                <AttachFileIcon />
            </IconButton>
            <IconButton component="label" sx={{ p: '5px' }} aria-label="directions">
                <input hidden accept="image/*" type="file" />
                <AddPhotoAlternateOutlinedIcon />
            </IconButton>
            <Button size='small' variant="contained" onClick={handleSend} sx={{
                borderRadius: '0px', 
                marginLeft: '10px'
            }}>Send</Button>
        </Paper>

    </Box>
  )
}

export default Input