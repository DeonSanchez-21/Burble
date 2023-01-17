import React, { useContext } from 'react';  
import './app.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from  './pages/Register';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

function App() {
  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if (!currentUser){
      return <Navigate to='/login'/>
    } else{return children}
  }

  return (
   
      <BrowserRouter className="App">
        <Routes>
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
