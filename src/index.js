import React from "react";
import {createRoot} from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

const root = createRoot(document.getElementById('root'))

root.render( 
<AuthContextProvider>
    <ChatContextProvider>
        <App/>
    </ChatContextProvider>
</AuthContextProvider>)

