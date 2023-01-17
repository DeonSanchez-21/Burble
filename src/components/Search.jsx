import { Avatar, Box, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { collection, query, where, getDoc, setDoc, doc, updateDoc, getDocs, serverTimestamp, } from "firebase/firestore";
import { db } from '../firebase';
import {AuthContext} from '../context/AuthContext'

const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query( 
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data())
      });
    } catch(err) {
      setErr(true)
    }

  }

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
      
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  
  
  return (
    <Box sx={{ borderBottom: '1px solid #808888' }}>
      <input value={username} className='user_search' type='text' placeholder='Find a user' onKeyDown={handleKey} onChange={e=> setUsername(e.target.value)} />
      {err && <Typography> user not found</Typography>}
      {user && <Box onClick={handleSelect} sx={{ display: 'flex', alignItems:'center', justifyContent: 'left', padding: '0.5rem'}}>
        <Avatar src={user.photoURL} sx={{ width: 40, height: 40}}></Avatar>
        <Typography sx={{ color: 'white', paddingLeft: '0.5rem'}}>{user.displayName}</Typography>
      </Box>}
    </Box>
  )
}

export default Search